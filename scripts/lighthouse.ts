import { type ChildProcess, spawn, spawnSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { createServer } from 'node:net'
import { join } from 'node:path'

import lighthouse, {
  type Config,
  type Flags,
  type RunnerResult
} from 'lighthouse'
import desktopConfig from 'lighthouse/core/config/desktop-config.js'
import { chromium } from 'playwright'

/**
 * Every page, on a phone and on a desktop, in daylight and at night, scores 100
 * in every category but performance, which has its own floor, or the run
 * fails. The CV says so, so it has to be true on every commit.
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

const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo']

/**
 * Printable copies marked `noindex` on purpose: SEO would rightly call them
 * uncrawlable, so they answer to the three other categories only.
 */
const UNINDEXED_PATHS = ['/en/cv/plain', '/fr/cv/plain']

/**
 * The quick pass: one locale, one screen, one theme. Script weight and
 * accessibility read the same in all of them; the full matrix stays in CI.
 */
const QUICK_FLAG = '--quick'
const QUICK_LOCALE_PREFIX = '/en'

/**
 * Lighthouse CI's assertion names, so a budget reads the same here as in any
 * Lighthouse documentation. Headroom over what the pages measure today, so a
 * regression shows before the score moves. The mobile LCP is Lantern's
 * simulation at slow-4G rates, not a visitor's.
 *
 * The script budget sits over a project page, the heaviest: it draws the app's
 * screens and its mechanism in SVG, with words no other page downloads.
 */
const BUDGETS_WITH_HEADROOM = {
  'cumulative-layout-shift': 0.01,
  'largest-contentful-paint': { desktop: 1050, mobile: 2800 },
  'resource-summary:script:size': 235_000
}

/**
 * Performance follows the simulated LCP down; the other categories have no
 * such excuse.
 */
const MIN_PERFORMANCE_UNDER_SIMULATED_LCP: Record<FormFactor, number> = {
  desktop: 90,
  mobile: 85
}
const MIN_SCORE = 100

const minScoreFor = (category: string, formFactor: FormFactor): number =>
  category === 'performance'
    ? MIN_PERFORMANCE_UNDER_SIMULATED_LCP[formFactor]
    : MIN_SCORE

/**
 * A score under 100 is measured twice more and judged on the median, the way
 * `lhci` does.
 */
const RUNS_BEFORE_JUDGING_THE_MEDIAN = 3

type FormFactor = 'desktop' | 'mobile'
type Scheme = 'dark' | 'light'

const BLINK_PREFERRED_COLOR_SCHEME: Record<Scheme, number> = {
  dark: 0,
  light: 1
}

type Measure = {
  cls: number
  fcpMs: number
  lcpMs: number
  report: string
  scores: Record<string, number>
  scriptBytes: number
  tbtMs: number
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

const numericValueOf = (result: RunnerResult, audit: string): number =>
  result.lhr.audits[audit]?.numericValue ?? 0

const scriptBytesIn = (result: RunnerResult): number => {
  const details = result.lhr.audits['resource-summary']?.details
  const rows = details?.type === 'table' ? details.items : []
  const scripts = rows.find((row) => row.resourceType === 'script')

  return typeof scripts?.transferSize === 'number' ? scripts.transferSize : 0
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
    categories.map((id) => {
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
    cls: numericValueOf(result, 'cumulative-layout-shift'),
    fcpMs: numericValueOf(result, 'first-contentful-paint'),
    lcpMs: numericValueOf(result, 'largest-contentful-paint'),
    report: String(result.report),
    scores,
    scriptBytes: scriptBytesIn(result),
    tbtMs: numericValueOf(result, 'total-blocking-time')
  }
}

const failuresOf = (reading: Measure, formFactor: FormFactor): string[] => [
  ...Object.entries(reading.scores)
    .filter(([id, score]) => score < minScoreFor(id, formFactor))
    .map(([id, score]) => `${id} ${score}`),
  ...(reading.lcpMs >
  BUDGETS_WITH_HEADROOM['largest-contentful-paint'][formFactor]
    ? [`largest-contentful-paint ${Math.round(reading.lcpMs)} ms`]
    : []),
  ...(reading.cls > BUDGETS_WITH_HEADROOM['cumulative-layout-shift']
    ? [`cumulative-layout-shift ${reading.cls.toFixed(3)}`]
    : []),
  ...(reading.scriptBytes >
  BUDGETS_WITH_HEADROOM['resource-summary:script:size']
    ? [
        `resource-summary:script:size ${Math.round(reading.scriptBytes / 1000)} kB`
      ]
    : [])
]

const timingsOf = ({ fcpMs, lcpMs, tbtMs }: Measure): string =>
  `FCP ${Math.round(fcpMs)} ms · LCP ${Math.round(lcpMs)} ms · TBT ${Math.round(tbtMs)} ms`

const median = (values: number[]): number =>
  [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)] ?? 0

const medianOf = (readings: Measure[]): Measure => ({
  cls: median(readings.map(({ cls }) => cls)),
  fcpMs: median(readings.map(({ fcpMs }) => fcpMs)),
  lcpMs: median(readings.map(({ lcpMs }) => lcpMs)),
  report: readings.at(-1)?.report ?? '',
  scores: Object.fromEntries(
    Object.keys(readings[0]?.scores ?? {}).map((id) => [
      id,
      median(readings.map(({ scores }) => scores[id] ?? 0))
    ])
  ),
  scriptBytes: median(readings.map(({ scriptBytes }) => scriptBytes)),
  tbtMs: median(readings.map(({ tbtMs }) => tbtMs))
})

const reportNameFor = (path: string, formFactor: FormFactor, scheme: Scheme) =>
  `${path.slice(1).replaceAll('/', '-') || 'root'}.${formFactor}.${scheme}.html`

const baseUrl = process.env.LIGHTHOUSE_BASE_URL
const local = baseUrl === undefined ? await startLocalServer() : undefined
const origin = baseUrl ?? local?.origin ?? ''
const failures: string[] = []
const quick = process.argv.includes(QUICK_FLAG)
const schemes: Scheme[] = quick ? ['light'] : ['light', 'dark']
const formFactors: FormFactor[] = quick ? ['desktop'] : ['mobile', 'desktop']

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
      for (const formFactor of formFactors) {
        for (const path of paths) {
          const categories = !indexed(path)
            ? CATEGORIES.filter((id) => id !== 'seo')
            : CATEGORIES
          const url = `${origin}${path}`
          const label = `${path} ${formFactor} ${scheme}`
          const readings: Measure[] = []

          do {
            const reading = await measure(url, formFactor, categories)
            readings.push(reading)
            console.info(
              `     ${label.padEnd(36)} run ${readings.length}: ${timingsOf(reading)}`
            )
          } while (
            readings.length < RUNS_BEFORE_JUDGING_THE_MEDIAN &&
            failuresOf(medianOf(readings), formFactor).length > 0
          )

          const reading = medianOf(readings)
          const broken = failuresOf(reading, formFactor)

          console.info(
            `${broken.length === 0 ? 'ok  ' : 'FAIL'} ${label.padEnd(36)} LCP ${Math.round(reading.lcpMs)} ms · CLS ${reading.cls.toFixed(3)} · JS ${Math.round(reading.scriptBytes / 1000)} kB${broken.length === 0 ? '' : ` · ${broken.join(', ')}`}`
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
      '\nEvery page meets its scores and budgets, on both screens and in both themes.'
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
