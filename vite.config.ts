import { resolve } from 'node:path'

import { shellHead } from '@adrienlcp/prerender/vite'
import { metricTwins } from '@adrienlcp/styles/metric-twins'
import { themePreferencePlugin } from '@adrienlcp/theme-preference/vite'
import optimizeLocales from '@react-aria/optimize-locales-plugin'
import react from '@vitejs/plugin-react'
import fontaine from 'fontaine/postcss'
import { defineConfig } from 'vite'

import { highlightedExcerpts } from './scripts/highlighted-excerpts.ts'
import { svgArtwork } from './scripts/svg-artwork.ts'
import {
  IMAGE_ALTS,
  PAGE_HEADS
} from './src/presentation/head/document-head.ts'
import { OPEN_GRAPH_IMAGE_SIZE } from './src/presentation/head/open-graph-image.ts'
import { REGIONAL_LOCALES } from './src/presentation/i18n/regional-locales.ts'
import { themeStore } from './src/presentation/theme/theme-store.ts'

/**
 * What every page runs, the libraries and the site's own presentation and
 * infrastructure, in one chunk: left to itself, Rolldown cuts them into a score
 * of small shared chunks, each a request of its own. Features stay split, so a
 * page downloads its own content and no other page's.
 */
const SHELL_MODULES = /node_modules|src[/](?:presentation|infrastructure)[/]/

/**
 * What only the contact page runs: zod and the Web3Forms client, to check what
 * it sends and receives, and the form and its text fields, which no other page
 * draws. They stay in that page's chunks.
 */
const CONTACT_ONLY_MODULES = new RegExp(
  [
    /node_modules[/]zod[/]/,
    /src[/]infrastructure[/](?:env\.ts|web3forms[/])/,
    /src[/]presentation[/]components[/]ui[/](?:form|text-field)\.tsx/,
    /react-aria-components[/]dist[/]private[/](?:FieldError|Form|Input|TextArea|TextField)\.mjs/,
    /react-aria[/]dist[/]private[/](?:form|textfield)[/]/,
    /react-stately[/]dist[/]private[/]form[/]/
  ]
    .map(({ source }) => source)
    .join('|')
)

/** Fetched by the pages in that language only; English is the reference. */
const SECOND_LANGUAGE_DICTIONARIES =
  /src[/]presentation[/]i18n[/]dictionary-fr\.ts/

const isShellModule = (id: string): boolean =>
  SHELL_MODULES.test(id) &&
  !CONTACT_ONLY_MODULES.test(id) &&
  !SECOND_LANGUAGE_DICTIONARIES.test(id)

/**
 * Written per weight band in `_fonts.sass`: fontaine writes one fallback face
 * for a whole variable font, and matches neither a heavier weight's width nor
 * the capital height a trimmed title sits on.
 */
const FALLBACK_FACES_WRITTEN_BY_HAND = new Set([
  'Sofia Sans Condensed fallback',
  'Sofia Sans fallback'
])

/**
 * Arial Bold's own names and its metric twins' bold cuts, for the fallback
 * faces `_fonts.sass` draws in Arial Bold: `local()` matches one face of a
 * family, by its full or PostScript name.
 */
const ARIAL_BOLD_TWINS = {
  'Arial Bold': [
    'Arial Bold',
    'Arial-BoldMT',
    'Liberation Sans Bold',
    'Arimo Bold',
    'Roboto Bold'
  ]
}

/**
 * Each face gets a fallback face of its own, a local font scaled to the same
 * metrics: a page that misses the web face keeps the fallback, and lays its
 * text out where the web face would have.
 */
const metricMatchedFallbackFaces = fontaine({
  fallbacks: ['Arial'],
  resolvePath: (path) => resolve(import.meta.dirname, 'public', `.${path}`),
  skipFontFaceGeneration: (fallbackName) =>
    FALLBACK_FACES_WRITTEN_BY_HAND.has(fallbackName)
})

/**
 * The head the shell carries, which `pnpm dev` and the SPA fallback serve: the
 * English home page's. The prerender rewrites it per document.
 */
const ENGLISH_HOME_HEAD = PAGE_HEADS.en.home

export default defineConfig({
  build: {
    manifest: true,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'shell', test: isShellModule }]
        }
      }
    },
    sourcemap: true
  },
  css: {
    postcss: {
      plugins: [
        metricMatchedFallbackFaces,
        metricTwins({ twins: ARIAL_BOLD_TWINS })
      ]
    }
  },
  plugins: [
    shellHead({
      filename: resolve(import.meta.dirname, 'index.html'),
      metaContents: {
        'name="description"': ENGLISH_HOME_HEAD.description,
        'property="og:description"': ENGLISH_HOME_HEAD.description,
        'property="og:image:alt"': IMAGE_ALTS.en,
        'property="og:image:height"': String(OPEN_GRAPH_IMAGE_SIZE.height),
        'property="og:image:width"': String(OPEN_GRAPH_IMAGE_SIZE.width),
        'property="og:title"': ENGLISH_HOME_HEAD.title
      },
      title: ENGLISH_HOME_HEAD.title
    }),
    highlightedExcerpts(),
    svgArtwork(),
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
