/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
// eslint-disable-next-line import/extensions
import diffGen from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resultJSON = readFile('plainJSON.txt');

const plain1jsonpath = getFixturePath('file1.json');
const plain2jsonpath = getFixturePath('file2.json');

test('plain', () => {
  expect(diffGen(plain1jsonpath, plain2jsonpath)).toEqual(resultJSON);
});
