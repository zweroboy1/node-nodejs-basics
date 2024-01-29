import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

const transform = async () => {
  const reverse = new Transform({
    transform(chunk, _encoding, callback) {
      const reversedString = `${String(chunk).split('').reverse().join('')}\n`;
      callback(null, reversedString);
    },
  });

  await pipeline(process.stdin, reverse, process.stdout);
};

await transform();
