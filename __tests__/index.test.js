import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('json', () => {
  const expected = readFile('result.txt');
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expected);
});
