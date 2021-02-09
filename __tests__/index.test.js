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

const resultJSON = readFile('plainJSON.txt');

const file1Path = getFixturePath('file1.json');
const file2Path = getFixturePath('file2.json');

test('plain', () => {
  expect(diffGen(file1Path, file2Path)).toEqual(resultJSON);
});
