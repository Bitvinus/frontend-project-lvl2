/* eslint-disable import/extensions */
import process from 'process';
import path from 'path';
import _ from 'lodash';
import parse from './parser.js';
import formater from './formatters/index.js';

const diffGen = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2).sort();

  return allKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!_.has(obj1, key)) {
      return { name: key, status: 'added', value: value2 };
    }
    if (!_.has(obj2, key)) {
      return { name: key, status: 'removed', value: value1 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { name: key, status: 'unknown', children: diffGen(value1, value2) };
    }
    if (value1 === value2) {
      return { name: key, status: 'unupdated', value: value1 };
    }
    return {
      name: key, status: 'updated', oldValue: value1, newValue: value2,
    };
  });
};

export default (filepath1, filepath2, outputFormat = 'stylish') => {
  const currentDir = process.cwd();

  const fullPath1 = path.resolve(currentDir, filepath1);
  const fullPath2 = path.resolve(currentDir, filepath2);

  const obj1 = parse(fullPath1);
  const obj2 = parse(fullPath2);

  const diff = diffGen(obj1, obj2);

  return formater(diff, outputFormat);
};
