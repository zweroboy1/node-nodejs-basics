import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToCompress.txt';
const ARCHIVE_NAME = 'archive.gz';
const STREAM_ERROR_TEXT = 'Unable to ungzip file';

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, FOLDER_NAME, FILE_NAME);
  const archivePath = join(__dirname, FOLDER_NAME, ARCHIVE_NAME);

  const archive = createReadStream(archivePath);
  const source = createWriteStream(filePath, 'utf8');
  const unzip = createGunzip();

  pipeline(archive, unzip, source, (err) => {
    if (err) {
      console.error(err, STREAM_ERROR_TEXT);
      process.exit();
    }
  });
};

await decompress();
