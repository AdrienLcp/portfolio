import { resolve } from 'node:path'

import { normalizePath, type Plugin } from 'vite'

import { IMAGE_ALTS, PAGE_HEADS } from '../src/presentation/head/document-head'
import { setMeta, setTitle } from './head-tags'

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
      })
  ].reduce((next, write) => write(next), html)
}

/**
 * Fills the copy `index.html` leaves empty with the English home page's head,
 * read from `document-head.ts`, so the shell `pnpm dev` and the SPA fallback
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
