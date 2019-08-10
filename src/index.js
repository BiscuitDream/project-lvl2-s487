// https://github.com/evanw/node-source-map-support пакет для поддержки нодой node source map


import fs from 'fs';
// import _ from 'lodash';

const getDiff = (data1, data2) => {
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const dataKeys = [...(new Set(data1Keys.concat(data2Keys)))];

  // console.log('data1Keys :', data1Keys);
  // console.log('data2Keys :', data2Keys);
  // console.log('dataKeys :', dataKeys);

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
  // console.log(rawDiff);

  const diff = `{\n${rawDiff}}`;

  // const testKeys = _.union(file1Keys, file2Keys);
  // console.log('testKeys :', testKeys);

  // const diff1 = data1Keys.reduce((acc, key) => {
  //   if (data2Keys.includes(key)) {
  //     if (data1[key] === data2[key]) {
  //       return `${acc}    ${key}: ${data1[key]}\n`;
  //     }
  //     return `${acc}  + ${key}: ${data2[key]}\n  - ${key}: ${data1[key]}\n`;
  //   }
  //   return `${acc}  - ${key}: ${data1[key]}\n`;
  // }, '');

  // const diff2 = data2Keys.reduce((acc, key) => {
  //   if (!data1Keys.includes(key)) {
  //     return `${acc}  + ${key}: ${data2[key]}\n`;
  //   }
  //   return acc;
  // }, diff1);

  // console.log(diff1);
  // console.log(diff2);
  // console.log(diff);


  // const diff = `{\n${diff2}}`;

  return diff;
};

const genDiff = (file1Path, file2Path) => {
  const file1Content = fs.readFileSync(file1Path, 'utf-8');
  const file1Data = JSON.parse(file1Content);

  const file2Content = fs.readFileSync(file2Path, 'utf-8');
  const file2Data = JSON.parse(file2Content);

  return getDiff(file1Data, file2Data);
};

export default genDiff;

// Правильная проверка существования ключа в объекте - функция has из lodash.
// var object = { 'a': { 'b': 2 } };
// var other = _.create({ 'a': _.create({ 'b': 2 }) });

// _.has(object, 'a');
// // => true

// _.has(object, 'a.b');
// // => true

// _.has(object, ['a', 'b']);
// // => true

// _.has(other, 'a');
// // => false
