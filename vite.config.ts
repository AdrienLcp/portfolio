import { resolve } from 'node:path'

import { themePreferencePlugin } from '@adrienlcp/theme-preference/vite'
import optimizeLocales from '@react-aria/optimize-locales-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { englishHomeHead } from './scripts/english-home-head.ts'
import { REGIONAL_LOCALES } from './src/presentation/i18n/regional-locales.ts'
import { themeStore } from './src/presentation/theme/theme-store.ts'

/**
 * What every page runs, the libraries and the site's own presentation and
 * infrastructure, in one chunk: left to itself, Rolldown cuts them into a score
 * of small shared chunks, each a request of its own. Features stay split, so a
 * page downloads its own content and no other page's.
 */
const SHELL_MODULES = /node_modules|src[/](?:presentation|infrastructure)[/]/

export default defineConfig({
  build: {
    manifest: true,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'shell', test: SHELL_MODULES }]
        }
      }
    }
  },
  plugins: [
    englishHomeHead(),
    themePreferencePlugin(themeStore),
    react({ compiler: { logDiagnostics: true } }),
    {
      ...optimizeLocales.vite({ locales: Object.values(REGIONAL_LOCALES) }),
      enforce: 'pre'
    }
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src')
    }
  },
  server: {
    port: 5373,
    strictPort: true
  }
})
