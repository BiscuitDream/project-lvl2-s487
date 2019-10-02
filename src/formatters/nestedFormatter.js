import _ from 'lodash';

const getSpaces = depth => '  '.repeat(depth > 1 ? (depth * 2 - 1) : depth);

const customStringify = (value, depth) => {
  if (typeof value !== 'object') {
    return value;
  }

  const keys = Object.keys(value);
  const values = keys.reduce((acc, key) => `${acc}\n${getSpaces(depth + 1)}  ${key}: ${value[key]}`, '');
  return `{${values}\n${getSpaces(depth)}  }`;
};

const nestedFormatter = (ast) => {
  const iter = (elem, depth = 1) => {
    const spaces = getSpaces(depth);

    if (elem instanceof Array) {
      const strings = elem.map(el => iter(el, depth));
      return _.flatten(strings).join('\n');
    }

    switch (elem.type) {
      case 'unchanged':
        return `${spaces}  ${elem.name}: ${customStringify(elem.valueNew, depth)}`;
      case 'added':
        return `${spaces}+ ${elem.name}: ${customStringify(elem.valueNew, depth)}`;
      case 'removed':
        return `${spaces}- ${elem.name}: ${customStringify(elem.valueOld, depth)}`;
      case 'changed':
        return [`${spaces}- ${elem.name}: ${customStringify(elem.valueOld, depth)}`, `${spaces}+ ${elem.name}: ${customStringify(elem.valueNew, depth)}`];
      default:
        break;
    }

    return `${spaces}  ${elem.name}: {\n${iter(elem.children, depth + 1)}\n${spaces}  }`;
  };

  return `{\n${iter(ast)}\n}`;
};

export default nestedFormatter;
