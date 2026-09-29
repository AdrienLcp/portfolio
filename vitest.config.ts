import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

const PLAYWRIGHT_SPECS = 'e2e/**'
const WITHOUT_INDEX_HTML_FALLBACK = 'custom'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
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
