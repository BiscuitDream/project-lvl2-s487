import fs from 'fs';
import genDiff from '../src';

test('genDiff flat json', () => {
  // const resultPath = path.resolve(__dirname, './__fixtures__/result-json.txt');
  const resultPath = `${__dirname}/__fixtures__/result-json.txt`;
  const result = fs.readFileSync(resultPath, 'utf-8').trim();

  const beforePath = `${__dirname}/__fixtures__/before.json`;
  const afterPath = `${__dirname}/__fixtures__/after.json`;

  expect(genDiff(beforePath, afterPath)).toEqual(result);
});

test('genDiff flat yaml', () => {
  const resultPath = `${__dirname}/__fixtures__/result-yaml.txt`;
  const result = fs.readFileSync(resultPath, 'utf-8').trim();

  const beforePath = `${__dirname}/__fixtures__/before.yml`;
  const afterPath = `${__dirname}/__fixtures__/after.yml`;

  expect(genDiff(beforePath, afterPath)).toEqual(result);
});

test('genDiff flat ini', () => {
  const resultPath = `${__dirname}/__fixtures__/result-ini.txt`;
  const result = fs.readFileSync(resultPath, 'utf-8').trim();

  const beforePath = `${__dirname}/__fixtures__/before.ini`;
  const afterPath = `${__dirname}/__fixtures__/after.ini`;

  expect(genDiff(beforePath, afterPath)).toEqual(result);
});
