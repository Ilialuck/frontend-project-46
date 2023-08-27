import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import getParsedData from './parsers.js';

const getFileData = (filename) => {
  const filePath = path.resolve(process.cwd(), filename);
  const data = readFileSync(filePath, 'utf-8');
  return data;
};

const genDiff = (file1, file2) => {
  const file1format = path.extname(file1);
  const file2format = path.extname(file2);

  const data1 = getFileData(file1);
  const data2 = getFileData(file2);

  const obj1 = getParsedData(data1, file1format);
  const obj2 = getParsedData(data2, file2format);

  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.reduce((acc, key) => {
    const Obj1Line = `${key}: ${obj1[key]}\n`;
    const Obj2Line = `${key}: ${obj2[key]}\n`;
    let newLine = acc;
    if (!_.hasIn(obj2, key)) {
      newLine += `  - ${Obj1Line}`;
    } else if (!_.hasIn(obj1, key)) {
      newLine += `  + ${Obj2Line}`;
    } else if (obj1[key] !== obj2[key]) {
      newLine += `  - ${Obj1Line}  + ${Obj2Line}`;
    } else {
      newLine += `    ${Obj1Line}`;
    }
    return newLine;
  }, '');
  return `{\n${result}}`;
};

export default genDiff;
