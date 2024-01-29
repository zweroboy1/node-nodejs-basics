import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToRead.txt';
const FILE_SYSTEM_ERROR_TEXT = 'FS operation failed';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const targetFile = join(__dirname, FOLDER_NAME, FILE_NAME);

  try {
    const readStream = createReadStream(targetFile, 'utf-8');
    await pipeline(readStream, process.stdout);
  } catch {
    throw new Error(FILE_SYSTEM_ERROR_TEXT);
  }
};

await read();
