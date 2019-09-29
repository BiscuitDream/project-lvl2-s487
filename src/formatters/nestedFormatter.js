const getSpaces = depth => '  '.repeat(depth > 1 ? (depth * 2 - 1) : depth);

const customStringify = (value, depth) => {
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    const values = keys.reduce((acc, key) => `${acc}\n${getSpaces(depth + 1)}  ${key}: ${value[key]}`, '');
    return `{${values}\n${getSpaces(depth)}  }`;
  }
  return value;
};

const nestedFormatter = (ast) => {
  const iter = (elem, depth = 0) => {
    const spaces = getSpaces(depth);

    if (elem instanceof Array) {
      let string = '';
      for (let i = 0; i < elem.length; i += 1) {
        string = `${string}\n${iter(elem[i], depth)}`;
      }
      return string;
    }

    if (elem.type === 'parametre') {
      if (elem.status === 'unchanged') {
        return `${spaces}  ${elem.name}: ${customStringify(elem.valueNew, depth)}`;
      }
      if (elem.status === 'added') {
        return `${spaces}+ ${elem.name}: ${customStringify(elem.valueNew, depth)}`;
      }
      if (elem.status === 'removed') {
        return `${spaces}- ${elem.name}: ${customStringify(elem.valueOld, depth)}`;
      }
      if (elem.status === 'changed') {
        return `${spaces}- ${elem.name}: ${customStringify(elem.valueOld, depth)}\n${spaces}+ ${elem.name}: ${customStringify(elem.valueNew, depth)}`;
      }
    }

    const name = elem.name === 'root' ? '' : `  ${elem.name}: `;
    const endSpaces = elem.name === 'root' ? '' : `${spaces}  `;
    return `${spaces}${name}{${iter(elem.children, depth + 1)}\n${endSpaces}}`;
  };

  return `${iter(ast)}`;
};

export default nestedFormatter;
