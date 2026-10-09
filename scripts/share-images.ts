import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { chromium } from 'playwright'
import { createServer } from 'vite'

import { OPEN_GRAPH_IMAGE_SIZE } from '../src/presentation/head/open-graph-image'

const PUBLIC_DIR = join(import.meta.dirname, '..', 'public')

/** iOS rounds the corners itself, so the square is full-bleed. */
const IOS_TOUCH_ICON_SIZE = 180

/** Google shows a favicon only at a multiple of 48 px, and some crawlers ask for /favicon.ico whatever the page links. */
const SEARCH_RESULT_ICON_SIZE = 96
const LEGACY_ICO_SIZE = 48

/** An ICO file holding one PNG image, which every browser reads since Vista. */
const icoWrapping = (png: Buffer, size: number): Buffer => {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(1, 4)
  const entry = Buffer.alloc(16)
  entry.writeUInt8(size, 0)
  entry.writeUInt8(size, 1)
  entry.writeUInt16LE(1, 4)
  entry.writeUInt16LE(32, 6)
  entry.writeUInt32LE(png.length, 8)
  entry.writeUInt32LE(header.length + entry.length, 12)
  return Buffer.concat([header, entry, png])
}

const server = await createServer({ logLevel: 'error', server: { port: 0 } })
await server.listen()
const origin = server.resolvedUrls?.local[0]?.replace(/\/$/, '')

if (origin === undefined) {
  throw new Error('The Vite server gave no local URL')
}

const browser = await chromium.launch()

try {
  const context = await browser.newContext({
    colorScheme: 'light',
    reducedMotion: 'reduce',
    viewport: OPEN_GRAPH_IMAGE_SIZE
  })
  const page = await context.newPage()

  await page.goto(`${origin}/scripts/share-card.html`)
  await page.locator('[data-family-name]').filter({ hasText: /./ }).waitFor()
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: join(PUBLIC_DIR, 'og.png') })

  const favicon = await readFile(join(PUBLIC_DIR, 'favicon.svg'), 'utf8')
  const renderFavicon = async (size: number): Promise<Buffer> => {
    await page.setViewportSize({ height: size, width: size })
    await page.setContent(
      `<body style="margin:0">${favicon.replace(
        '<svg ',
        `<svg width="${size}" height="${size}" `
      )}</body>`
    )
    return page.screenshot()
  }

  await writeFile(
    join(PUBLIC_DIR, 'apple-touch-icon.png'),
    await renderFavicon(IOS_TOUCH_ICON_SIZE)
  )
  await writeFile(
    join(PUBLIC_DIR, 'favicon-96.png'),
    await renderFavicon(SEARCH_RESULT_ICON_SIZE)
  )
  await writeFile(
    join(PUBLIC_DIR, 'favicon.ico'),
    icoWrapping(await renderFavicon(LEGACY_ICO_SIZE), LEGACY_ICO_SIZE)
  )

  console.info(
    `Wrote og.png, apple-touch-icon.png, favicon-96.png and favicon.ico into ${PUBLIC_DIR}`
  )
} finally {
  await browser.close()
  await server.close()
}
