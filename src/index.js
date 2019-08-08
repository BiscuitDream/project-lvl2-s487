// https://github.com/evanw/node-source-map-support пакет для поддержки нодой node source map


// import genDiff from 'genDiff';
// const diff = genDiff(pathToFile1, pathToFile2);
// console.log(diff);


// Сделать безразличие к порядку строк в выводе


import fs from 'fs';
// import _ from 'lodash';

const getDiff = (file1, file2) => {
  const file1Keys = Object.keys(file1);
  const file2Keys = Object.keys(file2);

  // const testKeys = _.union(file1Keys, file2Keys);
  // console.log('testKeys :', testKeys);

  const diff1 = file1Keys.reduce((acc, key) => {
    if (file2Keys.includes(key)) {
      if (file1[key] === file2[key]) {
        return `${acc}    ${key}: ${file1[key]}\n`;
      }
      return `${acc}  + ${key}: ${file2[key]}\n  - ${key}: ${file1[key]}\n`;
    }
    return `${acc}  - ${key}: ${file1[key]}\n`;
  }, '');

  const diff2 = file2Keys.reduce((acc, key) => {
    if (!file1Keys.includes(key)) {
      return `${acc}  + ${key}: ${file2[key]}`;
    }
    return acc;
  }, diff1);

  const diff = `{\n${diff2}\n}`;

  // console.log(diff1);
  // console.log(diff2);
  // console.log(diff);

  return diff;
};

const genDiff = (filePath1, filePath2) => {
  const fileContent1 = fs.readFileSync(filePath1, 'utf-8');
  const fileData1 = JSON.parse(fileContent1);

  const fileContent2 = fs.readFileSync(filePath2, 'utf-8');
  const fileData2 = JSON.parse(fileContent2);

  return getDiff(fileData1, fileData2);
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
