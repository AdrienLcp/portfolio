import type { StorybookConfig } from '@storybook/react-vite'
import type { InlineConfig } from 'vite'

const withoutFlakyLazyCssChunks = (viteConfig: InlineConfig): InlineConfig => ({
  ...viteConfig,
  build: { ...viteConfig.build, cssCodeSplit: false }
})

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-vitest'
  ],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  viteFinal: withoutFlakyLazyCssChunks
}

export default config
