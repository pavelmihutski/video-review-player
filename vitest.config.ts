import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    include: ['**/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: ['./src/testing/vitest.setup.ts'],
    browser: {
      enabled: true,
      instances: [{ browser: 'chromium' }],
      provider: 'playwright',
    },
  },
});
