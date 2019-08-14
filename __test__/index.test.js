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
  ['before.json', 'after.json', 'expected-flat.txt'],
  ['before.yml', 'after.yml', 'expected-flat.txt'],
  ['before.ini', 'after.ini', 'expected-flat.txt'],
];

test.each(filesForTest)(
  'getDiff(%s, %s)',
  (beforeFile, afterFile, expectedFile) => {
    const expectedPath = `${__dirname}/__fixtures__/${expectedFile}`;
    const expected = fs.readFileSync(expectedPath, 'utf-8').trim();

    const beforePath = `${__dirname}/__fixtures__/${beforeFile}`;
    const afterPath = `${__dirname}/__fixtures__/${afterFile}`;

    expect(genDiff(beforePath, afterPath)).toEqual(expected);
  },
);
