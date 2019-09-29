#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.0.3')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'nested')
  .arguments('<firstConfig> <secondConfig>')
  .action((file1, file2) => console.log(genDiff(file1, file2, program.format)))
  .parse(process.argv);


if (!program.args.length) program.help();
