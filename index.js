/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable quotes */
/* eslint-disable quote-props */
import _ from 'lodash';

const obj1 = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false,
};

const obj2 = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io",
};

const diffGen = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2).sort();
  const result = {};

  for (const key of allKeys) {
    if (!keys1.includes(key)) {
      result[`+ ${key}`] = obj2[key];
    } else if (!keys2.includes(key)) {
      result[`- ${key}`] = obj1[key];
    } else if (obj1[key] !== obj2[key]) {
      result[`- ${key}`] = obj1[key];
      result[`+ ${key}`] = obj2[key];
    } else {
      result[`  ${key}`] = obj1[key];
    }
  }
  return result;
};
console.log(diffGen(obj1, obj2));
