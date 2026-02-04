import { afterAll, afterEach, beforeAll } from 'vitest';

import { worker } from '../api/mocks/browser';

beforeAll(async () => {
  if (typeof window !== 'undefined') {
    await worker.start();
  }
});

afterEach(() => {
  worker.resetHandlers();
});

afterAll(() => {
  worker.stop();
});
