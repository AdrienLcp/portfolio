import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

import { parseDocument } from '@adrienlcp/prerender'
import { describe, expect, it } from 'vitest'

import { prerenderedPages } from '../src/entry-server'
import { OPEN_GRAPH_IMAGE_SIZE } from '../src/presentation/head/open-graph-image'

const ROOT = resolve(import.meta.dirname, '..')
const BUILT_SITE = join(ROOT, 'dist')

if (!existsSync(join(BUILT_SITE, 'sitemap.xml'))) {
  throw new Error(
    'share-and-crawl reads the prerendered site: run `pnpm build` first'
  )
}

const canonicalOfAppShell = parseDocument(
  readFileSync(join(ROOT, 'index.html'), 'utf8')
)
  .querySelector('link[rel="canonical"]')
  ?.getAttribute('href')

/** The canonical link of `index.html` is the one place the host is written down. */
const SITE_ORIGIN = new URL(canonicalOfAppShell ?? '').origin

/** A PNG's IHDR chunk holds its width then its height, big-endian, from byte 16. */
const pngSize = (bytes: Buffer): { height: number; width: number } => ({
  height: bytes.readUInt32BE(20),
  width: bytes.readUInt32BE(16)
})

const openGraphOf = (path: string) => {
  const document = parseDocument(
    readFileSync(join(BUILT_SITE, `${path.slice(1)}.html`), 'utf8')
  )
  const property = (name: string): string =>
    document
      .querySelector(`meta[property="og:${name}"]`)
      ?.getAttribute('content') ?? ''

  return {
    image: property('image'),
    imageHeight: Number(property('image:height')),
    imageWidth: Number(property('image:width')),
    url: property('url')
  }
}

describe('share card', () => {
  it.each(prerenderedPages.map(({ path }) => path))(
    '%s names its own address and the card on the site origin',
    (path) => {
      const { image, url } = openGraphOf(path)

      expect(url).toBe(`${SITE_ORIGIN}${path}`)
      expect(new URL(image).origin).toBe(SITE_ORIGIN)
    }
  )

  it.each(prerenderedPages.map(({ path }) => path))(
    '%s announces the size the card is shipped at',
    (path) => {
      const { image, imageHeight, imageWidth } = openGraphOf(path)
      const shipped = pngSize(
        readFileSync(join(BUILT_SITE, `.${new URL(image).pathname}`))
      )

      expect({ height: imageHeight, width: imageWidth }).toEqual(shipped)
      expect(shipped).toEqual(OPEN_GRAPH_IMAGE_SIZE)
    }
  )
})

describe('sitemap', () => {
  const listed = [
    ...readFileSync(join(BUILT_SITE, 'sitemap.xml'), 'utf8').matchAll(
      /<loc>([^<]+)<\/loc>/g
    )
  ].map(([, location]) => location)

  it('lists every indexed page in every language, and nothing else', () => {
    const indexedPages = prerenderedPages.filter((page) => page.indexed)

    expect(listed.toSorted()).toEqual(
      indexedPages.map(({ path }) => `${SITE_ORIGIN}${path}`).toSorted()
    )
  })

  it('lists each page in as many languages as the others', () => {
    const pages = new Set(
      prerenderedPages.filter((page) => page.indexed).map(({ page }) => page)
    )
    const locales = new Set(prerenderedPages.map(({ locale }) => locale))

    expect(listed).toHaveLength(pages.size * locales.size)
  })
})
