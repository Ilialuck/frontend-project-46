import { readFileSync } from 'fs';
import path from 'path';
import getParsedData from './parser.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const getFileData = (filename) => {
  const filePath = path.resolve(process.cwd(), filename);
  const data = readFileSync(filePath, 'utf-8');
  return data;
};

const genDiff = (file1, file2, type = 'stylish') => {
  const file1format = path.extname(file1);
  const file2format = path.extname(file2);

  const data1 = getFileData(file1);
  const data2 = getFileData(file2);

  const objFromData1 = getParsedData(data1, file1format);
  const objFromData2 = getParsedData(data2, file2format);

  return format(buildTree(objFromData1, objFromData2), type);
};

export default genDiff;
