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
  const iter = (elems, names) => elems.filter(el => el.type !== 'unchanged').map((elem) => {
    // if (elem.type === 'listOfChildren') {
    //   return iter(elem.children, [...names, elem.name]);
    // }

    // if (elem instanceof Array) {
    //   const strings = elem
    //     .filter(el => el.type !== 'unchanged')
    //     .map(el => iter(el, names));

    //   return strings.join('\n');
    // }

    const preName = getPreName(names);

    switch (elem.type) {
      case 'listOfChildren':
        // return elem.children
        //   .filter(el => el.type !== 'unchanged')
        //   .map(el => iter(el, [...names, elem.name]))
        //   .join('\n');
        return iter(elem.children, [...names, elem.name]).join('\n');
      case 'unchanged':
        return `Property '${preName}${elem.name}' was added with value: ${getValue(elem.valueNew)}`;
      case 'added':
        return `Property '${preName}${elem.name}' was added with value: ${getValue(elem.valueNew)}`;
      case 'removed':
        return `Property '${preName}${elem.name}' was removed`;
      case 'changed':
        return `Property '${preName}${elem.name}' was updated. From ${getValue(elem.valueOld)} to ${getValue(elem.valueNew)}`;
      default:
        throw new Error(`Incorrect node type: ${elem.type}`);
    }
  });

  // return iter(ast, []);
  // return ast
  //   .filter(el => el.type !== 'unchanged')
  //   .map(el => iter(el, []))
  //   .join('\n');
  return iter(ast, []).join('\n');
};

export default plainFormatter;
