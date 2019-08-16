// https://github.com/evanw/node-source-map-support пакет для поддержки нодой node source map

import fs from 'fs';
import path from 'path';
import getParse from './parsers';

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

  const diff = getDiff(file1Data, file2Data);
  return diff;
};

export default genDiff;
