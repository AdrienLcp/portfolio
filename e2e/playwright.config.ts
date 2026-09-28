import { defineConfig, devices } from '@playwright/test'

/**
 * Against the built `dist` served by Pages' own runtime, not `vite preview`:
 * the clean URLs, the real 404 and the `_redirects` rewrite are Pages
 * behaviour, and they are what a journey breaks first. `E2E_BASE_URL` points
 * the same journeys at a deployment instead, and then no server is started.
 */
const LOCAL_PORT = 8789
const LOCAL_URL = `http://127.0.0.1:${LOCAL_PORT}`
const baseURL = process.env.E2E_BASE_URL ?? LOCAL_URL

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
        // Pinned: the locators read accessible names, and those are translated.
        locale: 'en-US'
      }
    }
  ],
  reporter: 'list',
  retries: process.env.CI ? 1 : 0,
  testDir: '.',
  use: { baseURL, trace: 'retain-on-failure' },
  webServer:
    process.env.E2E_BASE_URL === undefined
      ? {
          command: `npx -y wrangler@4 pages dev ../dist --ip 127.0.0.1 --port ${LOCAL_PORT}`,
          reuseExistingServer: false,
          timeout: 120_000,
          url: LOCAL_URL
        }
      : undefined
})
