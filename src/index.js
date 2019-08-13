// https://github.com/evanw/node-source-map-support пакет для поддержки нодой node source map


import fs from 'fs';
import path from 'path';
import getParse from './parsers';
// import _ from 'lodash';

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

const genDiff = (file1Path, file2Path) => {
  const file1Ext = path.extname(file1Path);
  const file1Parser = getParse(file1Ext);
  const file1Content = fs.readFileSync(file1Path, 'utf-8');
  const file1Data = file1Parser(file1Content);

  const file2Ext = path.extname(file2Path);
  const file2Parser = getParse(file2Ext);
  const file2Content = fs.readFileSync(file2Path, 'utf-8');
  const file2Data = file2Parser(file2Content);

  const diff = getDiff(file1Data, file2Data);
  return diff;
};

export default genDiff;
