// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  outputDir: './test-results/',
  fullyParallel: false, // For a small site, parallel doesn't give much benefit
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0, // Retry tests in CI for stability
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html'], ['list']],
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: process.env.CI ? 'on-first-retry' : 'on',
    screenshot: process.env.CI ? 'only-on-failure' : 'on',
    video: process.env.CI ? 'on-first-retry' : 'on',
    launchOptions: {
      slowMo: process.env.CI ? 0 : 100, // Slow down execution locally but not in CI
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    // Uncomment to add more browsers for testing when needed
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  /* Web server to use during testing */
  webServer: {
    command: 'npm run build && npx http-server dist -p 3000',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2 minutes
  },
});
