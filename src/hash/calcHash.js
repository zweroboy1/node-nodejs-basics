import { createReadStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { createHash } from 'crypto';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToCalculateHashFor.txt';
const HASH_ERROR_TEXT = 'Failed to calculate hash';

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const targetFile = join(__dirname, FOLDER_NAME, FILE_NAME);
  const readStream = createReadStream(targetFile);
  const hash = createHash('sha256');

  try {
    await pipeline(readStream, hash);
    console.log(hash.digest('hex'));
  } catch {
    throw new Error(HASH_ERROR_TEXT);
  }
};

await calculateHash();
