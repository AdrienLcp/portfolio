import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config.ts'

const PLAYWRIGHT_SPECS = 'e2e/**'
const WITHOUT_INDEX_HTML_FALLBACK = 'custom'

/**
 * How long a story file's page has to launch Chromium and open its session.
 * Vitest's 60 s default runs out when the machine is busy with other builds.
 * Vitest reads it from the root config only: set on the project, it is ignored.
 */
const BROWSER_SESSION_CONNECT_TIMEOUT_MS = 300_000

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      browser: { connectTimeout: BROWSER_SESSION_CONNECT_TIMEOUT_MS },
      coverage: {
        exclude: [
          'src/**/*.test.{ts,tsx}',
          'src/**/*.stories.{ts,tsx}',
          'src/**/*.d.ts'
        ],
        include: ['src/**/*.{ts,tsx}'],
        provider: 'v8',
        reporter: ['text', 'html', 'json-summary']
      },
      projects: [
        {
          extends: true,
          test: {
            exclude: [PLAYWRIGHT_SPECS, 'node_modules/**'],
            name: 'unit'
          }
        },
        {
          appType: WITHOUT_INDEX_HTML_FALLBACK,
          extends: true,
          plugins: [storybookTest({ configDir: '.storybook' })],
          test: {
            browser: {
              enabled: true,
              headless: true,
              instances: [{ browser: 'chromium' }],
              provider: playwright()
            },
            name: 'stories',
            setupFiles: ['./vitest.setup.ts']
          }
        }
      ]
    }
  })
)
