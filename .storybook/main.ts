import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-vitest'
  ],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  // Per-story CSS chunks are lazy-preloaded on navigation and intermittently
  // fail to load, which breaks the render: one eager stylesheet instead.
  viteFinal: (viteConfig) => ({
    ...viteConfig,
    build: { ...viteConfig.build, cssCodeSplit: false }
  })
}

export default config
