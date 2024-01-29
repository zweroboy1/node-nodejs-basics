import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const FOLDER_NAME = 'files';
const FILE_SYSTEM_ERROR_TEXT = 'FS operation failed';

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const targetFolder = path.join(__dirname, FOLDER_NAME);

  try {
    await fs.promises.access(targetFolder, fs.constants.R_OK);
    const folderList = await fs.promises.readdir(targetFolder, {
      withFileTypes: true,
    });
    folderList
      .filter((file) => file.isFile())
      .forEach((file) => console.log(file.name));
  } catch (error) {
    throw new Error(FILE_SYSTEM_ERROR_TEXT);
  }
};

await list();
