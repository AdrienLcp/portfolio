import { resolve } from 'node:path'

import { normalizePath, type Plugin } from 'vite'

import {
  IMAGE_ALTS,
  PAGE_HEADS
} from '../src/presentation/head/document-head.ts'
import { OPEN_GRAPH_IMAGE_SIZE } from '../src/presentation/head/open-graph-image.ts'
import { setMeta, setTitle } from './head-tags.ts'

const APP_SHELL = normalizePath(
  resolve(import.meta.dirname, '..', 'index.html')
)

const writeEnglishHomeHead = (html: string): string => {
  const { description, title } = PAGE_HEADS.en.home

  return [
    (next: string) => setTitle({ html: next, value: title }),
    (next: string) =>
      setMeta({
        html: next,
        identifyingAttribute: 'name="description"',
        value: description
      }),
    (next: string) =>
      setMeta({
        html: next,
        identifyingAttribute: 'property="og:title"',
        value: title
      }),
    (next: string) =>
      setMeta({
        html: next,
        identifyingAttribute: 'property="og:description"',
        value: description
      }),
    (next: string) =>
      setMeta({
        html: next,
        identifyingAttribute: 'property="og:image:alt"',
        value: IMAGE_ALTS.en
      }),
    (next: string) =>
      setMeta({
        html: next,
        identifyingAttribute: 'property="og:image:width"',
        value: String(OPEN_GRAPH_IMAGE_SIZE.width)
      }),
    (next: string) =>
      setMeta({
        html: next,
        identifyingAttribute: 'property="og:image:height"',
        value: String(OPEN_GRAPH_IMAGE_SIZE.height)
      })
  ].reduce((next, write) => write(next), html)
}

/**
 * Fills the copy `index.html` leaves empty with the English home page's head,
 * read from `document-head.ts`, and the share card's size, so the shell `pnpm dev` and the SPA fallback
 * serve cannot drift from it. The prerender then rewrites it per document.
 */
export const englishHomeHead = (): Plugin => ({
  name: 'english-home-head',
  transformIndexHtml: {
    handler: (html, { filename }) =>
      normalizePath(filename) === APP_SHELL ? writeEnglishHomeHead(html) : html,
    order: 'pre'
  }
})
