import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const PROJECT_FOLDER = 'files';
const NEW_PROJECT_FOLDER = 'files_copy';
const FILE_SYSTEM_ERROR_TEXT = 'FS operation failed';

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const projectFolderPath = path.join(__dirname, PROJECT_FOLDER);
  const newProjectFolderPath = path.join(__dirname, NEW_PROJECT_FOLDER);

  try {
    await fs.promises.access(newProjectFolderPath, fs.constants.R_OK);
    throw new Error();
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw new Error(FILE_SYSTEM_ERROR_TEXT);
    }
    try {
      const files = await fs.promises.readdir(projectFolderPath);
      await fs.promises.mkdir(newProjectFolderPath);
      for (const file of files) {
        const projectFile = path.join(projectFolderPath, file);
        const projectFileCopy = path.join(newProjectFolderPath, file);
        await fs.promises.copyFile(projectFile, projectFileCopy);
      }
    } catch {
      throw new Error(FILE_SYSTEM_ERROR_TEXT);
    }
  }
};

await copy();
