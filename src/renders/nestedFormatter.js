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

    // if (elem.type === 'listOfChildren') {
    //   return `${spaces}  ${elem.name}: {\n${iter(elem.children, depth + 1)}\n${spaces}  }`;
    // }

    // if (elem instanceof Array) {
    //   const strings = elem.map(el => iter(el, depth));
    //   return _.flatten(strings).join('\n');
    // }

    // Первый вариант свича добавлен
    switch (elem.type) {
      case 'listOfChildren':
        return `${spaces}  ${elem.name}: {\n${_.flatten(elem.children.map(el => iter(el, depth + 1))).join('\n')}\n${spaces}  }`;
      case 'unchanged':
        return `${spaces}  ${elem.name}: ${customStringify(elem.valueNew, depth)}`;
      case 'added':
        return `${spaces}+ ${elem.name}: ${customStringify(elem.valueNew, depth)}`;
      case 'removed':
        return `${spaces}- ${elem.name}: ${customStringify(elem.valueOld, depth)}`;
      case 'changed':
        return [`${spaces}- ${elem.name}: ${customStringify(elem.valueOld, depth)}`, `${spaces}+ ${elem.name}: ${customStringify(elem.valueNew, depth)}`];
      default:
        throw new Error(`Неверный тип узла: ${elem.type}`);
    }
  };

  // return `{\n${iter(ast)}\n}`;

  // так как дерево - список, возможно стоит корневому элементу дать имя и свойство со списком детей
  // Появляется повторение, похоже все-таки дерево надо перестроить
  // В plainFormatter аналогично
  return `{\n${_.flatten(ast.map(elem => iter(elem))).join('\n')}\n}`;
};

export default nestedFormatter;
