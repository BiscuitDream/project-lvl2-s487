import _ from 'lodash';

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
  const iter = (elem, names) => {
    if (elem instanceof Array) {
      const strings = elem
        .filter(el => el.type !== 'unchanged')
        .map(el => iter(el, names));

      return strings.join('\n');
    }

    if (!_.has(elem, 'children')) {
      const preName = getPreName(names);
      switch (elem.type) {
        case 'unchanged':
          return `Property '${preName}${elem.name}' was added with value: ${getValue(elem.valueNew)}`;
        case 'added':
          return `Property '${preName}${elem.name}' was added with value: ${getValue(elem.valueNew)}`;
        case 'removed':
          return `Property '${preName}${elem.name}' was removed`;
        case 'changed':
          return `Property '${preName}${elem.name}' was updated. From ${getValue(elem.valueOld)} to ${getValue(elem.valueNew)}`;
        default:
          break;
      }
    }

    return iter(elem.children, [...names, elem.name]);
  };

  return iter(ast, []);
};

export default plainFormatter;
