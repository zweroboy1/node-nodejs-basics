const PREFIX = '--';
const EQUAL_TEXT = ' is ';
const SEPARATOR = ', ';

const parseArgs = () => {
  const entries = {};
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    if (key.startsWith(PREFIX)) {
      const value = args[i + 1];
      entries[key.slice(2)] = value;
    }
  }

  const argsString = Object.entries(entries)
    .map(([key, value]) => `${key}${EQUAL_TEXT}${value}`)
    .join(SEPARATOR);

  console.log(argsString);
};

parseArgs();
