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
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/e2e/**', '**/dist/**'],
    setupFiles: ['./src/testing/vitest.setup.ts'],
    browser: {
      enabled: true,
      instances: [{ browser: 'chromium' }],
      provider: 'playwright',
    },
  },
});
