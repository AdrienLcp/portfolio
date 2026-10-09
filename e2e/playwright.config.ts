import { defineConfig, devices } from '@playwright/test'

/**
 * Against the built `dist` served by Pages' own runtime, not `vite preview`:
 * the clean URLs, the real 404 and the `_redirects` rewrite are Pages
 * behaviour, and they are what a journey breaks first. `E2E_BASE_URL` points
 * the same journeys at a deployment instead, and then no server is started.
 */
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
