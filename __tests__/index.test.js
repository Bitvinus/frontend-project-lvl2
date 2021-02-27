/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
// eslint-disable-next-line import/extensions
import diffGen from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const inputFormats = [
  ['json', 'json', 'expected_stylish.txt'],
  ['yml', 'yml', 'expected_stylish.txt'],
  ['yml', 'json', 'expected_stylish.txt'],
  ['json', 'yml', 'expected_stylish.txt'],
];

const outputFormats = [
  ['json', 'stylish', 'expected_stylish.txt'],
  ['json', 'plain', 'expected_plain.txt'],
  ['json', 'json', 'expected_flat.txt'],
  ['yml', 'stylish', 'expected_stylish.txt'],
  ['yml', 'plain', 'expected_plain.txt'],
  ['yml', 'json', 'expected_flat.txt'],
  ['yml', undefined, 'expected_stylish.txt'],
];

describe('Test diffGen, each input file format', () => {
  test.each(inputFormats)(
    'Comparison of %p file with %p file',
    (type1, type2, expectedResult) => {
      const expected = readFile(expectedResult);
      const filePath1 = getFixturePath(`file1.${type1}`);
      const filePath2 = getFixturePath(`file2.${type2}`);
      expect(diffGen(filePath1, filePath2, 'stylish')).toBe(expected);
    },
  );
});

describe('Test diffGen, each output format', () => {
  test.each(outputFormats)(
    'Comparison of %p files, %p output format',
    (type, format, expectedResult) => {
      const expected = readFile(expectedResult);
      const filePath1 = getFixturePath(`file1.${type}`);
      const filePath2 = getFixturePath(`file2.${type}`);
      expect(diffGen(filePath1, filePath2, format)).toBe(expected);
    },
  );
});
