import fs from 'fs';
import genDiff from '../src';
// npx jest --coverage

// test('genDiff flat json', () => {
//   // const resultPath = path.resolve(__dirname, './__fixtures__/result-json.txt');
//   const resultPath = `${__dirname}/__fixtures__/result-json.txt`;
//   const result = fs.readFileSync(resultPath, 'utf-8').trim();

//   const beforePath = `${__dirname}/__fixtures__/before.json`;
//   const afterPath = `${__dirname}/__fixtures__/after.json`;

//   expect(genDiff(beforePath, afterPath)).toEqual(result);
// });

// test('genDiff flat yaml', () => {
//   const resultPath = `${__dirname}/__fixtures__/result-yaml.txt`;
//   const result = fs.readFileSync(resultPath, 'utf-8').trim();

//   const beforePath = `${__dirname}/__fixtures__/before.yml`;
//   const afterPath = `${__dirname}/__fixtures__/after.yml`;

//   expect(genDiff(beforePath, afterPath)).toEqual(result);
// });

// test('genDiff flat ini', () => {
//   const resultPath = `${__dirname}/__fixtures__/result-ini.txt`;
//   const result = fs.readFileSync(resultPath, 'utf-8').trim();

//   const beforePath = `${__dirname}/__fixtures__/before.ini`;
//   const afterPath = `${__dirname}/__fixtures__/after.ini`;

//   expect(genDiff(beforePath, afterPath)).toEqual(result);
// });

const filesForTest = [
  ['before.json', 'after.json', 'result-json.txt'],
  ['before.yml', 'after.yml', 'result-yaml.txt'],
  ['before.ini', 'after.ini', 'result-ini.txt'],
];

test.each(filesForTest)(
  'compare %s and %s',
  (beforeFile, afterFile, resultFile) => {
    const resultPath = `${__dirname}/__fixtures__/${resultFile}`;
    const result = fs.readFileSync(resultPath, 'utf-8').trim();

    const beforePath = `${__dirname}/__fixtures__/${beforeFile}`;
    const afterPath = `${__dirname}/__fixtures__/${afterFile}`;

    expect(genDiff(beforePath, afterPath)).toEqual(result);
  },
);
