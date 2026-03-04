import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'https://www.demoblaze.com',
    headless: true,
    actionTimeout: 10000,
    navigationTimeout: 10000,
  },
});
