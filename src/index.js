// https://github.com/evanw/node-source-map-support пакет для поддержки нодой node source map


// import genDiff from 'genDiff';
// const diff = genDiff(pathToFile1, pathToFile2);
// console.log(diff);


import fs from 'fs';
// import _ from 'lodash';

const getDiff = (file1, file2) => {
  const file1Keys = Object.keys(file1);
  const file2Keys = Object.keys(file2);

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
  console.log(diff);

  return diff;
};

const genDiff = (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1, 'utf-8');
  const parsedFile1 = JSON.parse(file1);

  const file2 = fs.readFileSync(pathToFile2, 'utf-8');
  const parsedFile2 = JSON.parse(file2);

  return getDiff(parsedFile1, parsedFile2);

  // console.log('file1 :', file1);
  // console.log('typeof file1:', typeof file1);
  // console.log();
  // console.log('parsedFile1 :', parsedFile1);
  // console.log('typeof parsedFile1 :', typeof parsedFile1);
  // console.log();
  // console.log('====================');

  // console.log('file2 :', file2);
  // console.log('typeof file2:', typeof file2);
  // console.log();
  // console.log('parsedFile2 :', parsedFile2);
  // console.log('typeof parsedFile2 :', typeof parsedFile2);
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
