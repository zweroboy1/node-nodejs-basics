import { Transform } from 'stream';
import { pipeline } from 'stream/promises';
import { EOL } from 'os';

const transform = async () => {
  const reverse = new Transform({
    transform(chunk, _encoding, callback) {
      const reversedString = `${String(chunk)
        .trim()
        .split('')
        .reverse()
        .join('')}${EOL}`;
      callback(null, reversedString);
    },
  });

  await pipeline(process.stdin, reverse, process.stdout);
};

await transform();
