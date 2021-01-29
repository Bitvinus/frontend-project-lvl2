#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
// eslint-disable-next-line import/extensions
import diffGen from '../index.js';

const program = new Command();
program.version('0.0.1');

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv)
  .action((filepath1, filepath2) => {
    const file1 = fs.readFileSync(filepath1);
    const obj1 = JSON.parse(file1);
    const file2 = fs.readFileSync(filepath2);
    const obj2 = JSON.parse(file2);
    console.log(diffGen(obj1, obj2));
  });
