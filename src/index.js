import fs from 'fs';
import path from 'path';
import getParse from './parsers';
import getFormatter from './formatters';

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
            status: 'unchanged',
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
          valueOld: null,
          valueNew: data2[key],
          children: [],
        };
        return [...acc, elem];
      }

      const elem = {
        name: key,
        type: 'parametre',
        status: 'removed',
        valueOld: data1[key],
        valueNew: null,
        children: [],
      };
      return [...acc, elem];
    }, []);

    return childrenList;
  };

  const ast = {
    name: 'root',
    type: 'parametresList',
    children: iter(file1Data, file2Data),
  };

  return ast;
};

const getDataByPathToFile = (pathToFile) => {
  const extension = path.extname(pathToFile);
  const parser = getParse(extension);
  const content = fs.readFileSync(pathToFile, 'utf-8');
  const data = parser(content);
  return data;
};

const genDiff = (file1Path, file2Path, format) => {
  const file1Data = getDataByPathToFile(file1Path);
  const file2Data = getDataByPathToFile(file2Path);
  const ast = buildAst(file1Data, file2Data);
  const formater = getFormatter(format);
  const diff = formater(ast);

  return diff;
};

export default genDiff;
