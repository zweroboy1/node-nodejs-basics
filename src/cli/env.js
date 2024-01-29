const PREFIX = 'RSS_';
const SEPARATOR = '; ';

const parseEnv = () => {
  const envString = Object.entries(process.env)
    .filter(([key]) => key.startsWith(PREFIX))
    .map(([key, value]) => `${key}=${value}`)
    .join(SEPARATOR);

  console.log(envString);
};

parseEnv();
