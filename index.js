/* eslint-disable import/extensions */
import _ from 'lodash';
import parse from './parser.js';

const diffGen = (filepath1, filepath2) => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2).sort();
  const result = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key of allKeys) {
    if (!keys1.includes(key)) {
      result[`  + ${key}`] = obj2[key];
    } else if (!keys2.includes(key)) {
      result[`  - ${key}`] = obj1[key];
    } else if (obj1[key] !== obj2[key]) {
      result[`  - ${key}`] = obj1[key];
      result[`  + ${key}`] = obj2[key];
    } else {
      result[`    ${key}`] = obj1[key];
    }
  }

  const resultEntries = Object.entries(result);
  const resultFormating = resultEntries.reduce((acc, [key, value]) => acc.concat(`\n${key}: ${value}`), '');
  const res = `{${resultFormating}\n}`;
  return res;
};

export default diffGen;
