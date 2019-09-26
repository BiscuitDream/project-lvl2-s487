import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParse from './parsers';
import getFormatter from './formatters';

const buildAst = (file1Data, file2Data) => {
  const iter = (data1, data2) => {
    const dataKeys = _.union(_.keys(data1), _.keys(data2));

    const childrenList = dataKeys.map((key) => {
      if (_.has(data1, key) && _.has(data2, key)) {
        if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
          const elem = {
            name: key,
            type: 'parametresList',
            children: iter(data1[key], data2[key]),
          };
          return elem;
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
          return elem;
        }

        const elem = {
          name: key,
          type: 'parametre',
          status: 'changed',
          valueOld: data1[key],
          valueNew: data2[key],
          children: [],
        };
        return elem;
      }

      if (!_.has(data1, key)) {
        const elem = {
          name: key,
          type: 'parametre',
          status: 'added',
          valueOld: null,
          valueNew: data2[key],
          children: [],
        };
        return elem;
      }

      const elem = {
        name: key,
        type: 'parametre',
        status: 'removed',
        valueOld: data1[key],
        valueNew: null,
        children: [],
      };
      return elem;
    });

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
  const parse = getParse(extension.slice(1));
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
