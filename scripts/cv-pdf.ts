import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'

import { chromium, type Page } from 'playwright'
import { createServer } from 'vite'

import { cvPdfPath } from '../src/features/cv/cv-format'
import { LOCALES } from '../src/presentation/i18n/locale'

/** 297mm at the 96dpi Chromium lays print out with. */
const A4_HEIGHT_PX = 1123
const A4_WIDTH_PX = 794

const PUBLIC_DIR = join(import.meta.dirname, '..', 'public')

const waitForSheet = async (page: Page, selector: string): Promise<void> => {
  await page.locator(selector).waitFor()
  await page.evaluate(async () => {
    await document.fonts.ready
    await Promise.all(
      Array.from(document.images, (image) => image.decode().catch(() => {}))
    )
  })
}

/**
 * A CV is only worth sending on one sheet: overflow fails the run.
 * Measured under print media, which the page is left in for `page.pdf`.
 */
const assertOnePage = async (page: Page, url: string): Promise<void> => {
  await page.emulateMedia({ media: 'print' })
  const height = await page.evaluate(
    () => document.documentElement.scrollHeight
  )

  if (height > A4_HEIGHT_PX) {
    throw new Error(
      `${url} prints ${height}px tall, over one A4 page (${A4_HEIGHT_PX}px)`
    )
  }
}

const server = await createServer({
  logLevel: 'error',
  server: { port: 0 }
})
await server.listen()
const origin = server.resolvedUrls?.local[0]?.replace(/\/$/, '')

if (origin === undefined) {
  throw new Error('The Vite server gave no local URL')
}

const browser = await chromium.launch()

try {
  const context = await browser.newContext({
    colorScheme: 'light',
    viewport: { height: A4_HEIGHT_PX, width: A4_WIDTH_PX }
  })
  const page = await context.newPage()
  await mkdir(join(PUBLIC_DIR, 'cv'), { recursive: true })

  for (const locale of LOCALES) {
    for (const isPlain of [false, true]) {
      const url = `${origin}/${locale}/cv${isPlain ? '/plain' : ''}`
      await page.goto(url)
      await waitForSheet(page, isPlain ? '.cv-plain' : '.cv-sheet')

      await assertOnePage(page, url)

      const path = join(PUBLIC_DIR, cvPdfPath({ isPlain, locale }))
      await page.pdf({ path, preferCSSPageSize: true, printBackground: true })
      console.info(`Wrote ${path}`)
    }
  }
} finally {
  await browser.close()
  await server.close()
}
