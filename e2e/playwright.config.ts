import { defineConfig, devices } from '@playwright/test'

const PAGES_RUNTIME_PORT = 8789
const PAGES_RUNTIME_URL = `http://127.0.0.1:${PAGES_RUNTIME_PORT}`
const ACCESSIBLE_NAMES_LOCALE = 'en-US'

const deploymentUrl = process.env.E2E_BASE_URL
const baseURL = deploymentUrl ?? PAGES_RUNTIME_URL

export default defineConfig({
  expect: { timeout: 10_000 },
  forbidOnly: Boolean(process.env.CI),
  fullyParallel: true,
  outputDir: './test-results',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        locale: ACCESSIBLE_NAMES_LOCALE
      }
    }
  ],
  reporter: 'list',
  retries: process.env.CI ? 1 : 0,
  testDir: '.',
  use: { baseURL, trace: 'retain-on-failure' },
  webServer:
    deploymentUrl === undefined
      ? {
          command: `npx -y wrangler@4 pages dev ../dist --ip 127.0.0.1 --port ${PAGES_RUNTIME_PORT}`,
          reuseExistingServer: false,
          timeout: 120_000,
          url: PAGES_RUNTIME_URL
        }
      : undefined
})
