import fs from 'fs';
import genDiff from '../src';

const filesForTest = [
  ['before.json', 'after.json', 'expected-flat.txt', 'nested'],
  ['before.yml', 'after.yml', 'expected-flat.txt', 'nested'],
  ['before.ini', 'after.ini', 'expected-flat.txt', 'nested'],
  ['before-recursive.json', 'after-recursive.json', 'expected-recursive.txt', 'nested'],
  ['before-recursive.yml', 'after-recursive.yml', 'expected-recursive.txt', 'nested'],
  ['before-recursive.ini', 'after-recursive.ini', 'expected-recursive.txt', 'nested'],
  ['before.json', 'after.json', 'expected-flat-plain.txt', 'plain'],
  ['before-recursive.json', 'after-recursive.json', 'expected-recursive-plain.txt', 'plain'],
];

test.each(filesForTest)(
  'getDiff(%s, %s, %s, %s)',
  (beforeFile, afterFile, expectedFile, format) => {
    const expectedPath = `${__dirname}/__fixtures__/${expectedFile}`;
    const expected = fs.readFileSync(expectedPath, 'utf-8').trim();

    const beforePath = `${__dirname}/__fixtures__/${beforeFile}`;
    const afterPath = `${__dirname}/__fixtures__/${afterFile}`;

    expect(genDiff(beforePath, afterPath, format)).toEqual(expected);
  },
);
