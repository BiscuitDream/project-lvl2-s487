import fs from 'fs';
import genDiff from '../src';

test('genDiff json', () => {
  const result = fs.readFileSync(`${__dirname}/__fixtures__/result-json.txt`, 'utf-8');
  expect(genDiff(`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`)).toEqual(result);
});
