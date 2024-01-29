import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToRemove.txt';
const FILE_SYSTEM_ERROR_TEXT = 'FS operation failed';

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const fileToRemove = path.join(__dirname, FOLDER_NAME, FILE_NAME);
  try {
    await fs.promises.access(fileToRemove, fs.constants.F_OK);
    await fs.promises.unlink(fileToRemove);
  } catch {
    throw new Error(FILE_SYSTEM_ERROR_TEXT);
  }
};

await remove();
