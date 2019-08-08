import fs from 'fs';
// import path from 'path';
import genDiff from '../src';

test('genDiff flat json', () => {
  // const resultPath = path.resolve(__dirname, './__fixtures__/result-json.txt');
  const resultPath = `${__dirname}/__fixtures__/result-json.txt`;
  const result = fs.readFileSync(resultPath, 'utf-8').trim();

  const beforePath = `${__dirname}/__fixtures__/before.json`;
  const afterPath = `${__dirname}/__fixtures__/after.json`;

  expect(genDiff(beforePath, afterPath)).toEqual(result);
});
