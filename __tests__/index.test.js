import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const stylishResult = readFile('result.txt');
const plainResult = readFile('plainResult.txt');
const jsonResult = readFile('JSONresult.txt');

const extensions = ['json', 'yaml'];

test.each(extensions)('%s format', (extension) => {
  const file1 = getFixturePath(`file1.${extension}`);
  const file2 = getFixturePath(`file2.${extension}`);
  expect(genDiff(file1, file2)).toEqual(stylishResult);
  expect(genDiff(file1, file2, 'stylish')).toEqual(stylishResult);
  expect(genDiff(file1, file2, 'plain')).toEqual(plainResult);
  expect(genDiff(file1, file2, 'json')).toEqual(jsonResult);
});
