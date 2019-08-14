import fs from 'fs';
import genDiff from '../src';

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
