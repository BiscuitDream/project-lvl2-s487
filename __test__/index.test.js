import fs from 'fs';
import genDiff from '../src';

const filesForTest = [
  ['before.json', 'after.json', 'expected-flat.txt', 'common'],
  ['before.yml', 'after.yml', 'expected-flat.txt', 'common'],
  ['before.ini', 'after.ini', 'expected-flat.txt', 'common'],
  ['before-recursive.json', 'after-recursive.json', 'expected-recursive.txt', 'common'],
  ['before-recursive.yml', 'after-recursive.yml', 'expected-recursive.txt', 'common'],
  ['before-recursive.ini', 'after-recursive.ini', 'expected-recursive.txt', 'common'],
  ['before.json', 'after.json', 'expected-flat-plain.txt', 'plain'],
  ['before-recursive.json', 'after-recursive.json', 'expected-recursive-plain.txt', 'plain'],
];

test.each(filesForTest)(
  'getDiff(%s, %s)',
  (beforeFile, afterFile, expectedFile, format) => {
    // console.log('format :', format);
    const expectedPath = `${__dirname}/__fixtures__/${expectedFile}`;
    const expected = fs.readFileSync(expectedPath, 'utf-8').trim();

    const beforePath = `${__dirname}/__fixtures__/${beforeFile}`;
    const afterPath = `${__dirname}/__fixtures__/${afterFile}`;

    expect(genDiff(beforePath, afterPath, format)).toEqual(expected);
  },
);
