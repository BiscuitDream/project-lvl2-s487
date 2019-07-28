// https://github.com/evanw/node-source-map-support пакет для поддержки нодой node source map

import program from 'commander';

program
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);

const gendiff = () => {
  console.log('It\'s work!!');
};

export default gendiff;
