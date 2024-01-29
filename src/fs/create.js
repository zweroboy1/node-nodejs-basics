import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fresh.txt';
const FILE_CONTENT = 'I am fresh and young';
const FILE_EXISTS_ERROR_TEXT = 'FS operation failed';

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = path.join(__dirname, FOLDER_NAME, FILE_NAME);
  fs.writeFile(filePath, FILE_CONTENT, { flag: 'wx' }, (error) => {
    if (error) {
      if (error.code === 'EEXIST') {
        throw new Error(FILE_EXISTS_ERROR_TEXT);
      }
      throw error;
    }
  });
};

await create();
