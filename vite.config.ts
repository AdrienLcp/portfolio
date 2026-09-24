import { resolve } from 'node:path'

import optimizeLocales from '@react-aria/optimize-locales-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react({ compiler: { logDiagnostics: true } }),
    { ...optimizeLocales.vite({ locales: ['en-US', 'fr-FR'] }), enforce: 'pre' }
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
