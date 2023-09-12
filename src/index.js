import { readFileSync } from 'fs';
import path from 'path';
import getParsedData from './parser.js';
import buildDifferencesTree from './buildTree.js';
import format from './formatters/index.js';

const getFileData = (filename) => {
  const filePath = path.resolve(process.cwd(), filename);
  const fileformat = path.extname(filename).slice(1);
  const getReadFile = readFileSync(filePath, 'utf-8');
  const data = getParsedData(getReadFile, fileformat);
  return data;
};

const genDiff = (file1, file2, type = 'stylish') => {
  const data1 = getFileData(file1);
  const data2 = getFileData(file2);
  return format(buildDifferencesTree(data1, data2), type);
};

export default genDiff;
