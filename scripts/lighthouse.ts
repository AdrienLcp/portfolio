import { type ChildProcess, spawn, spawnSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { createServer } from 'node:net'
import { join } from 'node:path'

import lighthouse, { type Config, type Flags } from 'lighthouse'
import desktopConfig from 'lighthouse/core/config/desktop-config.js'
import { chromium } from 'playwright'

/**
 * Every page scores 100 in accessibility, best practices and SEO, or the run
 * fails, and no page shifts its layout. The CV says so, so it has to be true on
 * every commit. The performance score and timings are left out: a simulated
 * phone on slow 4G swings by a second between two runs, and a site this light
 * gains nothing from chasing it.
 *
 * Lighthouse drives a Chromium launched here, through its debugging port:
 * `chrome-launcher` would make a profile it fails to delete on Windows. The
 * night pass is a flag on that browser, because Lighthouse opens its own tab
 * and no page-level emulation reaches it.
 *
 * `LIGHTHOUSE_BASE_URL` audits a deployment; otherwise the built `dist` is
 * served by Pages' own runtime, the same one the end-to-end journeys use.
 * `LIGHTHOUSE_DEBUGGING_PORT` pins the browser's debugging port; otherwise the
 * system hands out a free one, so two projects' runs never meet on it.
 */

const ROOT = join(import.meta.dirname, '..')
const REPORT_DIR = join(ROOT, 'lighthouse-reports')
const PAGES_RUNTIME_PORT = 8795

const SCORED_CATEGORIES = ['accessibility', 'best-practices', 'seo']

/**
 * Performance is run in daylight for its layout shift alone, which reads the
 * same on every run: its score and timings are not judged.
 */
const MAX_CUMULATIVE_LAYOUT_SHIFT = 0.01

/**
 * Printable copies marked `noindex` on purpose: SEO would rightly call them
 * uncrawlable, so they answer to the three other categories only.
 */
const UNINDEXED_PATHS = ['/en/cv/plain', '/fr/cv/plain']

/**
 * The quick pass: one locale, one screen, one theme. The full matrix stays in
 * CI.
 */
const QUICK_FLAG = '--quick'
const QUICK_LOCALE_PREFIX = '/en'

const MIN_SCORE = 100

type FormFactor = 'desktop' | 'mobile'
type Scheme = 'dark' | 'light'

const BLINK_PREFERRED_COLOR_SCHEME: Record<Scheme, number> = {
  dark: 0,
  light: 1
}

type Measure = {
  cls: number | undefined
  report: string
  scores: Record<string, number>
}

const configFor: Record<FormFactor, Config | undefined> = {
  desktop: desktopConfig,
  mobile: undefined
}

/** A port nothing listens on, as the system hands it out. */
const freePort = (): Promise<number> =>
  new Promise((resolvePort, reject) => {
    const server = createServer()
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      server.close(() =>
        typeof address === 'object' && address !== null
          ? resolvePort(address.port)
          : reject(new Error('The system handed out no port'))
      )
    })
  })

const DEBUGGING_PORT =
  Number(process.env.LIGHTHOUSE_DEBUGGING_PORT) || (await freePort())

const startLocalServer = async (): Promise<{
  origin: string
  server: ChildProcess
}> => {
  const origin = `http://127.0.0.1:${PAGES_RUNTIME_PORT}`
  const isPortTaken = await fetch(origin).then(
    () => true,
    () => false
  )

  if (isPortTaken) {
    throw new Error(
      `${origin} already answers: another server holds the port, and its pages would be audited instead of dist`
    )
  }

  const server = spawn(
    `npx -y wrangler@4 pages dev dist --ip 127.0.0.1 --port ${PAGES_RUNTIME_PORT}`,
    {
      cwd: ROOT,
      detached: process.platform !== 'win32',
      shell: true,
      stdio: 'ignore'
    }
  )

  for (let attempt = 0; attempt < 120; attempt++) {
    try {
      await fetch(origin)
      return { origin, server }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  throw new Error(`Pages runtime never answered on ${origin}`)
}

const stopServerProcessTree = (server: ChildProcess): void => {
  if (server.pid === undefined) {
    return
  }

  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(server.pid), '/T', '/F'])
  } else {
    process.kill(-server.pid)
  }
}

const pathsFrom = async (origin: string): Promise<string[]> => {
  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text()
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]

  return locations.map(([, location]) => new URL(location ?? '').pathname)
}

/** Throws on a run that measured nothing: a page that never painted is no score of 0. */
const measure = async (
  url: string,
  formFactor: FormFactor,
  categories: string[]
): Promise<Measure> => {
  const flags: Flags = {
    logLevel: 'error',
    onlyCategories: categories,
    output: 'html',
    port: DEBUGGING_PORT
  }
  const result = await lighthouse(url, flags, configFor[formFactor])

  if (result === undefined) {
    throw new Error(`Lighthouse returned nothing for ${url} (${formFactor})`)
  }

  const { runtimeError } = result.lhr

  if (runtimeError !== undefined) {
    throw new Error(
      `${url} (${formFactor}): ${runtimeError.code} ${runtimeError.message}`
    )
  }

  const scores = Object.fromEntries(
    SCORED_CATEGORIES.filter((id) => categories.includes(id)).map((id) => {
      const score = result.lhr.categories[id]?.score

      if (typeof score !== 'number') {
        throw new Error(
          `${url} (${formFactor}): Lighthouse could not score ${id}`
        )
      }

      return [id, Math.round(score * 100)]
    })
  )

  return {
    cls: categories.includes('performance')
      ? result.lhr.audits['cumulative-layout-shift']?.numericValue
      : undefined,
    report: String(result.report),
    scores
  }
}

const failuresOf = ({ cls, scores }: Measure): string[] => [
  ...Object.entries(scores)
    .filter(([, score]) => score < MIN_SCORE)
    .map(([id, score]) => `${id} ${score}`),
  ...(cls !== undefined && cls > MAX_CUMULATIVE_LAYOUT_SHIFT
    ? [`cumulative-layout-shift ${cls.toFixed(3)}`]
    : [])
]

const reportNameFor = (path: string, formFactor: FormFactor, scheme: Scheme) =>
  `${path.slice(1).replaceAll('/', '-') || 'root'}.${formFactor}.${scheme}.html`

const baseUrl = process.env.LIGHTHOUSE_BASE_URL
const local = baseUrl === undefined ? await startLocalServer() : undefined
const origin = baseUrl ?? local?.origin ?? ''
const failures: string[] = []
const quick = process.argv.includes(QUICK_FLAG)
const schemes: Scheme[] = quick ? ['light'] : ['light', 'dark']

/**
 * The night theme changes colours, not weight or layout: it answers for its
 * contrasts only, on a phone.
 */
const formFactorsFor = (scheme: Scheme): FormFactor[] => {
  if (quick) {
    return ['desktop']
  }
  return scheme === 'dark' ? ['mobile'] : ['mobile', 'desktop']
}
const categoriesFor = (scheme: Scheme, path: string): string[] => {
  if (scheme === 'dark') {
    return ['accessibility']
  }
  return [
    ...SCORED_CATEGORIES.filter((id) => indexed(path) || id !== 'seo'),
    'performance'
  ]
}

/**
 * Pages serves every branch preview (`<branch>.<project>.pages.dev`) as
 * `noindex`, whatever the page says.
 */
const isNoindexBranchPreview = /^[^.]+\.[^.]+\.pages\.dev$/.test(
  new URL(origin).hostname
)
const indexed = (path: string): boolean =>
  !isNoindexBranchPreview && !UNINDEXED_PATHS.includes(path)

try {
  const pathsNamedOnTheCommandLine = process.argv
    .slice(2)
    .filter((arg) => arg !== QUICK_FLAG)
  const paths = [...(await pathsFrom(origin)), ...UNINDEXED_PATHS]
    .filter(
      (path) =>
        pathsNamedOnTheCommandLine.length === 0 ||
        pathsNamedOnTheCommandLine.includes(path)
    )
    .filter((path) => !quick || path.startsWith(QUICK_LOCALE_PREFIX))

  if (paths.length === 0) {
    throw new Error(
      `No page to audit: ${pathsNamedOnTheCommandLine.join(', ')} is not in the sitemap`
    )
  }
  await mkdir(REPORT_DIR, { recursive: true })

  for (const scheme of schemes) {
    const browser = await chromium.launch({
      args: [
        '--mute-audio',
        `--remote-debugging-port=${DEBUGGING_PORT}`,
        `--blink-settings=preferredColorScheme=${BLINK_PREFERRED_COLOR_SCHEME[scheme]}`
      ]
    })

    try {
      for (const formFactor of formFactorsFor(scheme)) {
        for (const path of paths) {
          const categories = categoriesFor(scheme, path)
          const label = `${path} ${formFactor} ${scheme}`
          const reading = await measure(
            `${origin}${path}`,
            formFactor,
            categories
          )
          const broken = failuresOf(reading)

          console.info(
            `${broken.length === 0 ? 'ok  ' : 'FAIL'} ${label.padEnd(36)} ${reading.cls === undefined ? 'accessibility only' : `CLS ${reading.cls.toFixed(3)}`}${broken.length === 0 ? '' : ` · ${broken.join(', ')}`}`
          )

          if (broken.length > 0) {
            failures.push(`${label}: ${broken.join(', ')}`)
          }
          await writeFile(
            join(REPORT_DIR, reportNameFor(path, formFactor, scheme)),
            reading.report
          )
        }
      }
    } finally {
      await browser.close()
    }
  }

  if (failures.length > 0) {
    console.error(
      `\n${failures.length} audit(s) under the bar, reports in lighthouse-reports/:\n${failures.join('\n')}`
    )
    process.exitCode = 1
  } else {
    console.info(
      '\nEvery page scores 100 and holds its layout, on both screens and in both themes.'
    )
  }
} catch (error) {
  console.error('\nThe Lighthouse gate could not measure:', error)
  process.exitCode = 1
} finally {
  if (local !== undefined) {
    stopServerProcessTree(local.server)
  }
}
