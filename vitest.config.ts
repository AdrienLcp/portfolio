import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'unit'
          }
        },
        {
          // Left on the default, Vite answers an unmatched request with
          // index.html, which boots a second app inside the story.
          appType: 'custom',
          extends: true,
          plugins: [storybookTest({ configDir: '.storybook' })],
          test: {
            // react-aria reads focus, pointer events and layout, which a DOM
            // emulation only approximates.
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
