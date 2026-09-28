import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { chromium } from 'playwright'
import { createServer } from 'vite'

const PUBLIC_DIR = join(import.meta.dirname, '..', 'public')

/** The size `og:image:width` and `og:image:height` announce in `index.html`. */
const OPEN_GRAPH = { height: 630, width: 1200 }

/** What iOS asks for; it rounds the corners itself, so the square is full-bleed. */
const TOUCH_ICON_SIZE = 180

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
    viewport: OPEN_GRAPH
  })
  const page = await context.newPage()

  await page.goto(`${origin}/en`)
  await page.locator('.lid').first().waitFor()
  // A share card is looked at, never clicked: the navigation and the button
  // would read as a screenshot of an interface rather than as the lid.
  await page.addStyleTag({
    content: '.site-nav, .theme-switch, .lid-band button { visibility: hidden }'
  })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: join(PUBLIC_DIR, 'og.png') })

  const favicon = await readFile(join(PUBLIC_DIR, 'favicon.svg'), 'utf8')
  await page.setViewportSize({
    height: TOUCH_ICON_SIZE,
    width: TOUCH_ICON_SIZE
  })
  await page.setContent(
    `<body style="margin:0">${favicon
      .replace(
        '<svg ',
        `<svg width="${TOUCH_ICON_SIZE}" height="${TOUCH_ICON_SIZE}" `
      )
      .replace(' clip-path="url(#lid)"', '')}</body>`
  )
  await page.screenshot({ path: join(PUBLIC_DIR, 'apple-touch-icon.png') })

  console.info(`Wrote og.png and apple-touch-icon.png into ${PUBLIC_DIR}`)
} finally {
  await browser.close()
  await server.close()
}
