#!/usr/bin/env node
import program from 'commander';
// eslint-disable-next-line import/extensions
import diffGen from '../index.js';

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    // eslint-disable-next-line no-console
    console.log(diffGen(filepath1, filepath2, program.format));
  })
  .parse(process.argv);
