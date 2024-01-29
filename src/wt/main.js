import { availableParallelism } from 'os';
import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const START_NUMBER = 10;
const WORKER_FILE = 'worker.js';

const performCalculations = async () => {
  const workersPromises = [];
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const workerPath = join(__dirname, WORKER_FILE);
  const coresCount = availableParallelism();

  for (let i = 0; i < coresCount; i++) {
    const workerPromise = new Promise((resolve) => {
      const worker = new Worker(workerPath, { workerData: START_NUMBER + i });
      worker.on('message', (data) => resolve({ status: 'resolved', data }));
      worker.on('error', () => resolve({ status: 'error', data: null }));
    });
    workersPromises.push(workerPromise);
  }

  const result = await Promise.all(workersPromises);
  console.log(result);
};

await performCalculations();
