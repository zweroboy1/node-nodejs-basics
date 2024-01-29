import { cp } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const FOLDER_NAME = 'files';
const NEW_FOLDER_NAME = 'files_copy';
const FILE_SYSTEM_ERROR_TEXT = 'FS operation failed';

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const oldFolderPath = join(__dirname, FOLDER_NAME);
  const newFolderPath = join(__dirname, NEW_FOLDER_NAME);

  cp(
    oldFolderPath,
    newFolderPath,
    {
      recursive: true,
      force: false,
      errorOnExist: true,
    },
    (err) => {
      if (err) {
        throw new Error(FILE_SYSTEM_ERROR_TEXT);
      }
    }
  );
};

await copy();
