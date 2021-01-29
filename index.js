/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable quotes */
/* eslint-disable quote-props */
import _ from 'lodash';

const diffGen = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2).sort();
  const result = {};

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
