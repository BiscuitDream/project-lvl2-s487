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
  const iter = (elems, depth = 1) => elems.map((elem) => {
    const spaces = getSpaces(depth);
    switch (elem.type) {
      case 'listOfChildren':
        return `${spaces}  ${elem.name}: {\n${_.flatten(iter(elem.children, depth + 1)).join('\n')}\n${spaces}  }`;
      case 'unchanged':
        return `${spaces}  ${elem.name}: ${customStringify(elem.valueNew, depth)}`;
      case 'added':
        return `${spaces}+ ${elem.name}: ${customStringify(elem.valueNew, depth)}`;
      case 'removed':
        return `${spaces}- ${elem.name}: ${customStringify(elem.valueOld, depth)}`;
      case 'changed':
        return [`${spaces}- ${elem.name}: ${customStringify(elem.valueOld, depth)}`, `${spaces}+ ${elem.name}: ${customStringify(elem.valueNew, depth)}`];
      default:
        throw new Error(`Incorrect node type: ${elem.type}`);
    }
  });

  return `{\n${_.flatten(iter(ast)).join('\n')}\n}`;
};

export default nestedFormatter;
