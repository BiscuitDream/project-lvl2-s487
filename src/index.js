import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParse from './parsers';
import getFormatter from './formatters';

const buildAst = (file1Data, file2Data) => {
  const iter = (data1, data2) => {
    // const data1Keys = Object.keys(data1);
    // const data2Keys = Object.keys(data2);
    // const dataKeys = [...(new Set(data1Keys.concat(data2Keys)))];
    const dataKeys = _.union(_.keys(data1), _.keys(data2));
    // const keys = Object.keys({ ...obj1, ...obj2 });
    // const keys = _.union(_.keys(obj1), _.keys(obj2));

    const childrenList = dataKeys.reduce((acc, key) => {
      // if (data1Keys.includes(key) && data2Keys.includes(key)) {
      if (_.has(data1, key) && _.has(data2, key)) {
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

      // if (!data1Keys.includes(key)) {
      if (!_.has(data1, key)) {
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
  const parse = getParse(extension);
  const content = fs.readFileSync(pathToFile, 'utf-8');
  const data = parse(content);
  return data;
};

const genDiff = (file1Path, file2Path, OutputFormat) => {
  const file1Data = getDataByPathToFile(file1Path);
  const file2Data = getDataByPathToFile(file2Path);
  const ast = buildAst(file1Data, file2Data);
  const format = getFormatter(OutputFormat);
  const diff = format(ast);

  return diff;
};

export default genDiff;
