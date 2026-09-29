import { resolve } from 'node:path'

import optimizeLocales from '@react-aria/optimize-locales-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { REGIONAL_LOCALES } from './src/presentation/i18n/regional-locales'

export default defineConfig({
  build: {
    manifest: true
  },
  plugins: [
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
