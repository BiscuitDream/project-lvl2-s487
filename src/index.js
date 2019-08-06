// https://github.com/evanw/node-source-map-support пакет для поддержки нодой node source map

// import program from 'commander';

// program
//   .version('0.0.1')
//   .description('Compares two configuration files and shows a difference.')
//   .arguments('<firstConfig> <secondConfig>')
//   .option('-f, --format [type]', 'Output format')
//   .parse(process.argv);


// if (!program.args.length) program.help();

// const gendiff = () => {
//   console.log('It\'s work!!');
// };

// export default gendiff;


// const genDiff = (filepath1, filepath2) => {
//   const fileData1 = JSON.parse(fs.readFileSync(filepath1), 'utf-8');
//   const fileData2 = JSON.parse(fs.readFileSync(filepath2), 'utf-8');
//   return getDiff(fileData1, fileData2);
// };

// export default genDiff;


// import genDiff from 'genDiff';
// const diff = genDiff(pathToFile1, pathToFile2);
// console.log(diff);


import fs from 'fs';

const genDiff = (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1, 'utf-8');
  const parsedFile1 = JSON.parse(file1);

  const file2 = fs.readFileSync(pathToFile2, 'utf-8');
  const parsedFile2 = JSON.parse(file2);

  console.log('file1 :', file1);
  console.log('typeof file1:', typeof file1);
  console.log();
  console.log('parsedFile1 :', parsedFile1);
  console.log('typeof parsedFile1 :', typeof parsedFile1);
  console.log();
  console.log('====================');

  console.log('file2 :', file2);
  console.log('typeof file2:', typeof file2);
  console.log();
  console.log('parsedFile2 :', parsedFile2);
  console.log('typeof parsedFile2 :', typeof parsedFile2);
  // fs.readFile('/etc/passwd', 'utf8', callback);
};

export default genDiff;

// сделать, чтобы файлы читались из всех мест. чтобы можно было указывать относительные пути
