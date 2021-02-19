/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
// eslint-disable-next-line import/extensions
import diffGen from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resultJSON = readFile('expected_result.txt');
const resultYaml = readFile('expected_result.txt');

test('plain json files', () => {
  const file1JSON = getFixturePath('file1.json');
  const file2JSON = getFixturePath('file2.json');
  expect(diffGen(file1JSON, file2JSON)).toEqual(resultJSON);
});
test('plain yaml files', () => {
  const file1Yaml = getFixturePath('file1.yaml');
  const file2Yaml = getFixturePath('file2.yaml');
  expect(diffGen(file1Yaml, file2Yaml)).toEqual(resultYaml);
});
