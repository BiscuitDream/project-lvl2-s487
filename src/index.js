// https://github.com/evanw/node-source-map-support пакет для поддержки нодой node source map

import fs from 'fs';
import path from 'path';
import getParse from './parsers';


//   // const example = { type: tagsList, body: [ { type: tag, name: <>, body: <>, options: {} }] }

// Обрабатываем AST
// const iterAst = (ast) => {
//   switch (ast.type) {
//     case 'tagsList':
//       return `${ast.body.map(iterAst).join('')}`;
//     case 'tag':
//       const attrsLine = Object.keys(ast.options).reduce(
//         (acc, key) => `${acc} ${key}="${ast.options[key]}"`,
//         '',
//       );
//       return `<${ast.name$}${attrsLine}>${iterAst(ast.body)}</${ast.name}>`;
//     default:
//       return ast;
//       // nothing
//   }
// };

// Строим AST
// const iter = (data) => {
//   if (data[0] instanceof Array) {
//     return { type: 'tagsList', body: data.map(iter) };
//   }

//   let body;
//   let options;
//   if (data.length === 3) {
//     body = data[2];
//     options = data[1];
//   } else if (data.length === 2) {
//     body = data[1];
//     options = {};
//   }

//   const processedBody = (body instanceof Array) ? iter(body) : body;

//   return { type: 'tag', name: data[0], body: processedBody, options };
// };


// const example = {
//   type: 'parametresList',
//   children: [
//     {
//       type: 'parametre',
//       name: 'paramName',
//       status: 'delete',
//       oldValue: 'value1',
//       newValue: '',
//       children: [],
//     },
//   ],
// };

// const anotherExample = {
//   name: 'key',
//   type: 'changed',
//   value: {
//     old: 'old-value',
//     new: 'new-value',
//   },
//   children: [],
// };
// type: changed, added, deleted


// ////////////////////////////
const buildAst = (file1Data, file2Data) => {
  const iter = (data1, data2) => {
    const data1Keys = Object.keys(data1);
    const data2Keys = Object.keys(data2);
    const dataKeys = [...(new Set(data1Keys.concat(data2Keys)))];

    const childrenList = dataKeys.reduce((acc, key) => {
      if (data1Keys.includes(key) && data2Keys.includes(key)) {
        if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
          const elem = {
            name: key,
            type: 'parametresList',
            children: iter(data1[key], data2[key]),
          };
          return [...acc, elem];
        }

        if (data1[key] === data2[key]) {
          const elem = {
            name: key,
            type: 'parametre',
            status: 'not changed',
            valueOld: data1[key],
            valueNew: data2[key],
            children: [],
          };
          return [...acc, elem];
        }

        const elem = {
          name: key,
          type: 'parametre',
          status: 'changed',
          valueOld: data1[key],
          valueNew: data2[key],
          children: [],
        };
        return [...acc, elem];
      }

      if (!data1Keys.includes(key)) {
        const elem = {
          name: key,
          type: 'parametre',
          status: 'added',
          valueOld: null, // maybe undefined
          valueNew: data2[key],
          children: [],
        };
        return [...acc, elem];
      }

      const elem = {
        name: key,
        type: 'parametre',
        status: 'deleted',
        valueOld: data1[key],
        valueNew: null, // maybe undefined
        children: [],
      };
      return [...acc, elem];
    }, []);

    // const ast = childrenList.length > 0
    //   ? { type: 'parametresList', children: childrenList } : {};
    // return ast;
    return childrenList;
  };

  const ast = {
    name: 'root',
    type: 'parametresList',
    children: iter(file1Data, file2Data),
  };
  // return iter(file1Data, file2Data);
  return ast;
};
// //////////////////////
// ========================
const customStringify = (value, spaces) => {
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    const values = keys.reduce((acc, key) => `${acc}\n${spaces.repeat(3)}${key}: ${value[key]}`, '');
    return `{${values}\n${spaces}  }`;
  }
  return value;
};

const parseAst = (ast) => {
  const iter = (elem, depth = 0) => {
    const spaces = '  '.repeat(depth);
    // console.log('depth :', depth);

    if (elem instanceof Array) {
      let string = '';
      for (let i = 0; i < elem.length; i += 1) {
        string = `${string}\n${iter(elem[i], depth)}`;
      }
      return string;
    }

    if (elem.type === 'parametre') {
      if (elem.status === 'not changed') {
        return `${spaces}  ${elem.name}: ${customStringify(elem.valueNew, spaces)}`;
      }
      if (elem.status === 'added') {
        return `${spaces}+ ${elem.name}: ${customStringify(elem.valueNew, spaces)}`;
      }
      if (elem.status === 'deleted') {
        return `${spaces}- ${elem.name}: ${customStringify(elem.valueOld, spaces)}`;
      }
      if (elem.status === 'changed') {
        return `${spaces}- ${elem.name}: ${customStringify(elem.valueOld, spaces)}\n${spaces}+ ${elem.name}: ${customStringify(elem.valueNew, spaces)}`;
      }
    }
    const name = elem.name === 'root' ? '' : `  ${elem.name}: `;
    // return `${name}{\n${elem.children.map(iter).join('\n')}\n}`;
    if (elem.type === 'parametresList') {
      return `${spaces}${name}{${iter(elem.children, depth + 1)}\n}`;
    }
  };

  return `${iter(ast)}`;
};
// =================


// const getDiff = (data1, data2) => {
//   const data1Keys = Object.keys(data1);
//   const data2Keys = Object.keys(data2);
//   const dataKeys = [...(new Set(data1Keys.concat(data2Keys)))];

//   const rawDiff = dataKeys.reduce((acc, key) => {
//     if (data1Keys.includes(key) && data2Keys.includes(key)) {
//       if (data1[key] === data2[key]) {
//         return `${acc}    ${key}: ${data1[key]}\n`;
//       }
//       return `${acc}  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`;
//     }
//     if (!data1Keys.includes(key)) {
//       return `${acc}  + ${key}: ${data2[key]}\n`;
//     }
//     return `${acc}  - ${key}: ${data1[key]}\n`;
//   }, '');

//   const diff = `{\n${rawDiff}}`;

//   return diff;
// };

const getDataByPathToFile = (pathToFile) => {
  const extension = path.extname(pathToFile);
  const parser = getParse(extension);
  const content = fs.readFileSync(pathToFile, 'utf-8');
  const data = parser(content);
  return data;
};

const genDiff = (file1Path, file2Path) => {
  const file1Data = getDataByPathToFile(file1Path);
  // console.log('file1Data'); //
  // console.log(file1Data); //
  const file2Data = getDataByPathToFile(file2Path);
  // console.log('file2Data'); //
  // console.log(file2Data); //
  // console.log('!!!!AST!!!!!!!'); //
  const ast = buildAst(file1Data, file2Data);
  // console.log(JSON.stringify(ast, null, 2)); //
  // console.log('!!!!!!!!!COMPARISON!!!!!!!'); //
  // console.log(parseAst(ast)); //

  // const diff = getDiff(file1Data, file2Data);
  const diff = parseAst(ast);
  console.log(diff);
  return diff;
};

export default genDiff;
