import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { chromium } from 'playwright'
import { createServer } from 'vite'

import { OPEN_GRAPH_IMAGE_SIZE } from '../src/presentation/head/open-graph-image'

const PUBLIC_DIR = join(import.meta.dirname, '..', 'public')

/** iOS rounds the corners itself, so the square is full-bleed. */
const IOS_TOUCH_ICON_SIZE = 180

const CONTROLS_HIDDEN_ON_A_SHARE_CARD =
  '.site-nav, .theme-switch, .lid-band button'

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

  await page.goto(`${origin}/en`)
  await page.locator('.lid').first().waitFor()
  await page.addStyleTag({
    content: `${CONTROLS_HIDDEN_ON_A_SHARE_CARD} { visibility: hidden }`
  })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: join(PUBLIC_DIR, 'og.png') })

  const favicon = await readFile(join(PUBLIC_DIR, 'favicon.svg'), 'utf8')
  await page.setViewportSize({
    height: IOS_TOUCH_ICON_SIZE,
    width: IOS_TOUCH_ICON_SIZE
  })
  await page.setContent(
    `<body style="margin:0">${favicon
      .replace(
        '<svg ',
        `<svg width="${IOS_TOUCH_ICON_SIZE}" height="${IOS_TOUCH_ICON_SIZE}" `
      )
      .replace(' clip-path="url(#lid)"', '')}</body>`
  )
  await page.screenshot({ path: join(PUBLIC_DIR, 'apple-touch-icon.png') })

  console.info(`Wrote og.png and apple-touch-icon.png into ${PUBLIC_DIR}`)
} finally {
  await browser.close()
  await server.close()
}
