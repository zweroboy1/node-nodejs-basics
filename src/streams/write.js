import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToWrite.txt';
const STREAM_WRITE_ERROR_TEXT = 'Unable to write the stream';

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const targetFile = join(__dirname, FOLDER_NAME, FILE_NAME);
  const writeStream = createWriteStream(targetFile, 'utf-8');

  try {
    await pipeline(process.stdin, writeStream);
  } catch {
    throw new Error(STREAM_WRITE_ERROR_TEXT);
  }
};

await write();
