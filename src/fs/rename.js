import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const FOLDER_NAME = 'files';
const WRONG_FILENAME = 'wrongFilename.txt';
const PROPER_FILENAME = 'properFilename.md';
const FILE_SYSTEM_ERROR_TEXT = 'FS operation failed';

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const sourceFile = path.join(__dirname, FOLDER_NAME, WRONG_FILENAME);
  const destinationFile = path.join(__dirname, FOLDER_NAME, PROPER_FILENAME);

  try {
    await fs.promises.access(destinationFile, fs.constants.F_OK);
    throw new Error(FILE_SYSTEM_ERROR_TEXT);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw new Error(FILE_SYSTEM_ERROR_TEXT);
    }
    try {
      await fs.promises.access(sourceFile, fs.constants.F_OK);
      await fs.promises.rename(sourceFile, destinationFile);
    } catch {
      throw new Error(FILE_SYSTEM_ERROR_TEXT);
    }
  }
};

await rename();
