import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const FOLDER_NAME = 'files';
const SCRIPT_NAME = 'script.js';

const spawnChildProcess = async (args) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const childFilename = join(__dirname, FOLDER_NAME, SCRIPT_NAME);

  const childProcess = spawn('node', [childFilename, ...args]);

  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);

  childProcess.on('exit', (code) => {
    console.log(`Exit with code: ${code}`);
  });
};

spawnChildProcess(['someArgument1', 'someArgument2', 'someArgument3']);
