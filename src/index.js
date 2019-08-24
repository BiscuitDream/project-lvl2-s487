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

// Что делать с отступами в функции, которая рендерит строку ? Как - то рекурсивно их увеличивать ? что - то подзавис на этом месте
// Kirill Mokevnin
// 28 августа 2018
// Именно.Отслеживай глубину.


// ////////////////////////////
// iter процесс с аккумулятором
const buildAst = (data1, data2) => {
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const dataKeys = [...(new Set(data1Keys.concat(data2Keys)))];

  const childrenList = dataKeys.reduce((acc, key) => {
    if (data1Keys.includes(key) && data2Keys.includes(key)) {
      if (data1[key] === data2[key]) {
        const elem = {
          type: 'parametre',
          name: key,
          status: 'not changed',
          valueOld: data1[key],
          valueNew: data2[key],
          children: [],
        };
        return [...acc, elem];
      }

      const elem = {
        type: 'parametre',
        name: key,
        status: 'changed',
        valueOld: data1[key],
        valueNew: data2[key],
        children: [],
      };
      return [...acc, elem];
    }

    if (!data1Keys.includes(key)) {
      const elem = {
        type: 'parametre',
        name: key,
        status: 'added',
        valueOld: undefined, // maybe null
        valueNew: data2[key],
        children: [],
      };
      return [...acc, elem];
    }

    const elem = {
      type: 'parametre',
      name: key,
      status: 'deleted',
      valueOld: data1[key],
      valueNew: undefined, // maybe null
      children: [],
    };
    return [...acc, elem];
  }, []);

  const ast = childrenList.length > 0 ? { type: 'parametresList', children: childrenList } : {};
  return ast;
};
// //////////////////////


const getDiff = (data1, data2) => {
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const dataKeys = [...(new Set(data1Keys.concat(data2Keys)))];

  const rawDiff = dataKeys.reduce((acc, key) => {
    if (data1Keys.includes(key) && data2Keys.includes(key)) {
      if (data1[key] === data2[key]) {
        return `${acc}    ${key}: ${data1[key]}\n`;
      }
      return `${acc}  + ${key}: ${data2[key]}\n  - ${key}: ${data1[key]}\n`;
    }
    if (!data1Keys.includes(key)) {
      return `${acc}  + ${key}: ${data2[key]}\n`;
    }
    return `${acc}  - ${key}: ${data1[key]}\n`;
  }, '');

  const diff = `{\n${rawDiff}}`;

  return diff;
};

const getDataByPathToFile = (pathToFile) => {
  const extension = path.extname(pathToFile);
  const parser = getParse(extension);
  const content = fs.readFileSync(pathToFile, 'utf-8');
  const data = parser(content);
  return data;
};

const genDiff = (file1Path, file2Path) => {
  const file1Data = getDataByPathToFile(file1Path);
  // console.log('file1Data');
  // console.log(file1Data);
  const file2Data = getDataByPathToFile(file2Path);
  // console.log('file2Data');
  // console.log(file2Data);
  console.log('ast!!!!!!!!!!!!!!!!!');
  console.log(buildAst(file1Data, file2Data));

  const diff = getDiff(file1Data, file2Data);
  return diff;
};

export default genDiff;
