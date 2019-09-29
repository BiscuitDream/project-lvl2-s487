const getPreName = (nameList) => {
  const preName = nameList.join('.');
  return preName.length === 0 ? '' : `${preName}.`;
};

const getValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'boolean' || typeof value === 'number') {
    return value;
  }
  return `'${value}'`;
};

const plainFormatter = (ast) => {
  const iter = (elem, name) => {
    if (elem instanceof Array) {
      let string = '';
      for (let i = 0; i < elem.length; i += 1) {
        string = `${string}${(elem[i].status === 'unchanged' ? '' : `${iter(elem[i], name)}\n`)}`;
      }
      return string.trim();
    }

    if (elem.type === 'parametre') {
      const preName = getPreName(name);

      if (elem.status === 'unchanged') {
        return '';
      }
      if (elem.status === 'added') {
        return `Property '${preName}${elem.name}' was added with value: ${getValue(elem.valueNew)}`;
      }
      if (elem.status === 'removed') {
        return `Property '${preName}${elem.name}' was removed`;
      }
      if (elem.status === 'changed') {
        return `Property '${preName}${elem.name}' was updated. From ${getValue(elem.valueOld)} to ${getValue(elem.valueNew)}`;
      }
    }

    return iter(elem.children, [...name, elem.name]);
  };

  return iter(ast, []);
};

export default plainFormatter;
