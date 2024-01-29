import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToRead.txt';
const FILE_SYSTEM_ERROR_TEXT = 'FS operation failed';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const sourceFile = path.join(__dirname, FOLDER_NAME, FILE_NAME);

  try {
    // await fs.promises.access(sourceFile, fs.constants.R_OK);
    const fileContent = await fs.promises.readFile(sourceFile, {
      encoding: 'utf8',
    });
    console.log(fileContent);
  } catch (error) {
    throw new Error(FILE_SYSTEM_ERROR_TEXT);
  }
};

await read();
