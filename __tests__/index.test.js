import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe.each([['stylish'], ['plain'], ['json']])('%s formatter', (formatter) => {
  const resultFilePath = getFixturePath(`${formatter}.txt`);
  const expected = readFileSync(resultFilePath, 'utf-8');

  test.each([['json'], ['yaml']])('%s files', (extension) => {
    const file1 = getFixturePath(`file1.${extension}`);
    const file2 = getFixturePath(`file2.${extension}`);

    const result = genDiff(file1, file2, formatter);

    expect(result).toBe(expected);
  });
});
