import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParse from './parsers';
import getFormatter from './renders';

const buildAst = (file1Data, file2Data) => {
  const iter = (data1, data2) => {
    const dataKeys = _.union(_.keys(data1), _.keys(data2));

    const childrenList = dataKeys.map((key) => {
      if (_.has(data1, key) && _.has(data2, key)) {
        if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
          return {
            name: key,
            type: 'listOfChildren',
            children: iter(data1[key], data2[key]),
          };
        }

        if (data1[key] === data2[key]) {
          return {
            name: key,
            type: 'unchanged',
            valueOld: data1[key],
            valueNew: data2[key],
          };
        }

        return {
          name: key,
          type: 'changed',
          valueOld: data1[key],
          valueNew: data2[key],
        };
      }

      if (!_.has(data1, key)) {
        return {
          name: key,
          type: 'added',
          valueNew: data2[key],
        };
      }

      return {
        name: key,
        type: 'removed',
        valueOld: data1[key],
      };
    });

    return childrenList;
  };

  const ast = iter(file1Data, file2Data);

  return ast;
};

const getDataByPathToFile = (pathToFile) => {
  const extension = path.extname(pathToFile);
  const parse = getParse(extension.slice(1));
  const content = fs.readFileSync(pathToFile, 'utf-8');
  const data = parse(content);
  return data;
};

const genDiff = (file1Path, file2Path, outputFormat) => {
  const file1Data = getDataByPathToFile(file1Path);
  const file2Data = getDataByPathToFile(file2Path);
  const ast = buildAst(file1Data, file2Data);
  const render = getFormatter(outputFormat);
  const diff = render(ast);

  return diff;
};

export default genDiff;
