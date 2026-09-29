import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import type { PrerenderedPage, RenderedPage } from '../src/entry-server'
import type { Locale } from '../src/presentation/i18n/locale'

type EntryServer = {
  imageAlts: Record<Locale, string>
  openGraphLocaleFor: (locale: Locale) => string
  prerenderedPages: PrerenderedPage[]
  renderPage: (page: PrerenderedPage) => Promise<RenderedPage>
  structuredDataFor: (args: {
    origin: string
    page: PrerenderedPage
  }) => Promise<object>
}

const ROOT = resolve(import.meta.dirname, '..')
const CLIENT_DIR = join(ROOT, 'dist')
const SERVER_ENTRY = join(ROOT, 'dist-ssr', 'entry-server.js')

const VITE_MANIFEST_FILE = '.vite/manifest.json'

type BuildChunk = {
  css?: string[]
  file: string
  imports?: string[]
}

const replaceOnce = ({
  html,
  pattern,
  replacement
}: {
  html: string
  pattern: RegExp
  replacement: string
}): string => {
  let matched = 0
  const next = html.replace(
    new RegExp(pattern.source, `${pattern.flags}g`),
    () => {
      matched += 1

      return replacement
    }
  )

  if (matched !== 1) {
    throw new Error(
      `prerender: ${String(pattern)} matched ${matched} times in index.html, expected 1`
    )
  }

  return next
}

const escapeAttribute = (value: string): string =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')

const escapeText = (value: string): string =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;')

const setMeta = ({
  html,
  identifyingAttribute,
  value
}: {
  html: string
  identifyingAttribute: string
  value: string
}): string =>
  replaceOnce({
    html,
    pattern: new RegExp(
      String.raw`<meta\s+content="[^"]*"\s+${identifyingAttribute}\s*/>`
    ),
    replacement: `<meta content="${escapeAttribute(value)}" ${identifyingAttribute} />`
  })

const CANONICAL = /<link\s+href="[^"]*"\s+rel="canonical"\s*\/>/

const originOfCanonicalLink = (template: string): string => {
  const canonical = CANONICAL.exec(template)
  const origin =
    canonical === null ? undefined : /href="([^"]*)"/.exec(canonical[0])?.[1]

  if (origin === undefined) {
    throw new Error(
      'prerender: index.html carries no canonical link to read the origin from'
    )
  }

  return new URL(origin).origin
}

const htmlFileForPath = (path: string): string => `${path.slice(1)}.html`

const LINKED_STYLESHEETS =
  /<link[^>]*rel="stylesheet"[^>]*>(?:\s*<link[^>]*rel="stylesheet"[^>]*>)*/

const linkedStylesheetsOf = (html: string): string[] => {
  const run = LINKED_STYLESHEETS.exec(html)?.[0]

  if (run === undefined) {
    throw new Error(
      'prerender: index.html links no stylesheet, so there is nothing to inline'
    )
  }

  return [...run.matchAll(/href="([^"]*)"/g)].flatMap(([, href]) => href ?? [])
}

const chunkAfterItsStaticImports = ({
  module,
  seen
}: {
  module: string
  seen: Set<string>
}): BuildChunk[] => {
  if (seen.has(module)) {
    return []
  }

  seen.add(module)

  const chunk = buildManifest[module]

  if (chunk === undefined) {
    throw new Error(
      `prerender: ${module} is not in Vite's manifest; routes.tsx names a module this build did not emit`
    )
  }

  return [
    ...(chunk.imports ?? []).flatMap((imported) =>
      chunkAfterItsStaticImports({ module: imported, seen })
    ),
    chunk
  ]
}

const stylesheets = new Map<string, string>()

const readStylesheet = async (href: string): Promise<string> => {
  const cached = stylesheets.get(href)

  if (cached !== undefined) {
    return cached
  }

  const css = await readFile(join(CLIENT_DIR, href.slice(1)), 'utf8')

  if (css.includes('</style')) {
    throw new Error(
      `prerender: ${href} would close the <style> tag it is inlined into`
    )
  }

  stylesheets.set(href, css)

  return css
}

const templateAndPageChunkStylesFor = async (
  module: string
): Promise<string> => {
  const hrefs = [
    ...new Set([
      ...templateStylesheets,
      ...chunkAfterItsStaticImports({ module, seen: new Set() }).flatMap(
        (chunk) => (chunk.css ?? []).map((file) => `/${file}`)
      )
    ])
  ]

  return (await Promise.all(hrefs.map(readStylesheet))).join('\n')
}

const PRELOADED_MODULES =
  /<link[^>]*rel="modulepreload"[^>]*>(?:\s*<link[^>]*rel="modulepreload"[^>]*>)*/

const preloadedModulesOf = (html: string): string => {
  const run = PRELOADED_MODULES.exec(html)?.[0]

  if (run === undefined) {
    throw new Error(
      'prerender: index.html preloads no module, so there is no run to add a page chunk to'
    )
  }

  return run
}

const entryScriptOf = (html: string): string => {
  const src = /<script[^>]*type="module"[^>]*src="([^"]*)"/.exec(html)?.[1]

  if (src === undefined) {
    throw new Error('prerender: index.html carries no module entry script')
  }

  return src
}

const lazyPageChunkPreloadsFor = (module: string): string =>
  chunkAfterItsStaticImports({ module, seen: new Set() })
    .map((chunk) => `/${chunk.file}`)
    .filter((href) => !alreadyRequested.has(href))
    .map(
      (href) => `\n    <link rel="modulepreload" crossorigin href="${href}">`
    )
    .join('')

const PRERENDERED_ONLY_FONT_PRELOADS = [
  'archivo-latin',
  'literata-latin',
  'literata-latin-italic'
]
  .map(
    (face) =>
      `\n    <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/${face}.woff2">`
  )
  .join('')

const withoutScriptClosingTags = (json: string): string =>
  json.replaceAll('<', '\\u003c')

const jsonLd = (data: object): string =>
  `<script type="application/ld+json">${withoutScriptClosingTags(JSON.stringify(data))}</script>`

const documentFor = ({
  page,
  preloads,
  rendered,
  everyLanguageVersion,
  structuredData,
  styles
}: {
  page: PrerenderedPage
  preloads: string
  rendered: RenderedPage
  everyLanguageVersion: PrerenderedPage[]
  structuredData: object
  styles: string
}): string => {
  const url = `${origin}${page.path}`

  const alternates = [
    ...everyLanguageVersion.map(
      (sibling) =>
        `<link href="${origin}${sibling.path}" hreflang="${sibling.locale}" rel="alternate" />`
    ),
    `<link href="${languageNegotiatingRoot}" hreflang="x-default" rel="alternate" />`
  ].join('\n    ')

  const alternateOpenGraphLocales = everyLanguageVersion
    .filter((sibling) => sibling.locale !== page.locale)
    .map(
      (sibling) =>
        `<meta content="${openGraphLocaleFor(sibling.locale)}" property="og:locale:alternate" />`
    )
    .join('\n    ')

  return [
    (html: string) =>
      replaceOnce({
        html,
        pattern: /<html lang="[^"]*">/,
        replacement: `<html lang="${page.locale}">`
      }),
    (html: string) =>
      replaceOnce({
        html,
        pattern: /<title>[^<]*<\/title>/,
        replacement: `<title>${escapeText(rendered.title)}</title>`
      }),
    (html: string) =>
      setMeta({
        html,
        identifyingAttribute: 'name="description"',
        value: rendered.description
      }),
    (html: string) =>
      replaceOnce({
        html,
        pattern: CANONICAL,
        replacement: `<link href="${url}" rel="canonical" />\n    ${alternates}`
      }),
    (html: string) =>
      setMeta({
        html,
        identifyingAttribute: 'property="og:title"',
        value: rendered.title
      }),
    (html: string) =>
      setMeta({
        html,
        identifyingAttribute: 'property="og:description"',
        value: rendered.description
      }),
    (html: string) =>
      setMeta({ html, identifyingAttribute: 'property="og:url"', value: url }),
    (html: string) =>
      setMeta({
        html,
        identifyingAttribute: 'property="og:image:alt"',
        value: imageAlts[page.locale]
      }),
    (html: string) =>
      setMeta({
        html,
        identifyingAttribute: 'property="og:locale"',
        value: openGraphLocaleFor(page.locale)
      }),
    (html: string) =>
      replaceOnce({
        html,
        pattern:
          /<meta\s+content="[^"]*"\s+property="og:locale:alternate"\s*\/>/,
        replacement: alternateOpenGraphLocales
      }),
    (html: string) =>
      replaceOnce({
        html,
        pattern: PRELOADED_MODULES,
        replacement: `${PRERENDERED_ONLY_FONT_PRELOADS}${preloadedModules}${preloads}`
      }),
    (html: string) =>
      replaceOnce({
        html,
        pattern: LINKED_STYLESHEETS,
        replacement: `<style>${styles}</style>`
      }),
    (html: string) =>
      replaceOnce({
        html,
        pattern: /<\/head>/,
        replacement: `  ${jsonLd(structuredData)}\n  </head>`
      }),
    (html: string) =>
      replaceOnce({
        html,
        pattern: /<div id="root"><\/div>/,
        replacement: `<div id="root">${rendered.html}</div>`
      })
  ].reduce((html, step) => step(html), template)
}

const sitemapFor = (pages: PrerenderedPage[]): string => {
  const urls = pages.map((page) => {
    const alternates = everyLanguageVersionOf(page)
      .map(
        (sibling) =>
          `    <xhtml:link rel="alternate" hreflang="${sibling.locale}" href="${origin}${sibling.path}"/>`
      )
      .join('\n')

    return `  <url>\n    <loc>${origin}${page.path}</loc>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${languageNegotiatingRoot}"/>\n  </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`
}

const robotsAllowingEveryPageSoNoindexStaysReadable = (): string =>
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`

const noindexShellForUnknownPaths = (shell: string): string =>
  replaceOnce({
    html: shell,
    pattern: /<\/head>/,
    replacement: '  <meta name="robots" content="noindex" />\n  </head>'
  })

const template = await readFile(join(CLIENT_DIR, 'index.html'), 'utf8')
const origin = originOfCanonicalLink(template)
const languageNegotiatingRoot = `${origin}/`
const templateStylesheets = linkedStylesheetsOf(template)
const preloadedModules = preloadedModulesOf(template)

const alreadyRequested = new Set([
  entryScriptOf(template),
  ...[...preloadedModules.matchAll(/href="([^"]*)"/g)].flatMap(
    ([, href]) => href ?? []
  )
])

const buildManifest: Record<string, BuildChunk> = JSON.parse(
  await readFile(join(CLIENT_DIR, VITE_MANIFEST_FILE), 'utf8')
)

const {
  imageAlts,
  openGraphLocaleFor,
  prerenderedPages,
  renderPage,
  structuredDataFor
}: EntryServer = await import(pathToFileURL(SERVER_ENTRY).href)

const everyLanguageVersionOf = (page: PrerenderedPage): PrerenderedPage[] =>
  prerenderedPages.filter((candidate) => candidate.page === page.page)

for (const page of prerenderedPages) {
  const destination = join(CLIENT_DIR, htmlFileForPath(page.path))

  await mkdir(dirname(destination), { recursive: true })
  await writeFile(
    destination,
    documentFor({
      everyLanguageVersion: everyLanguageVersionOf(page),
      page,
      preloads: lazyPageChunkPreloadsFor(page.module),
      rendered: await renderPage(page),
      structuredData: await structuredDataFor({ origin, page }),
      styles: await templateAndPageChunkStylesFor(page.module)
    }),
    'utf8'
  )
}

await writeFile(
  join(CLIENT_DIR, 'sitemap.xml'),
  sitemapFor(prerenderedPages),
  'utf8'
)
await writeFile(
  join(CLIENT_DIR, 'robots.txt'),
  robotsAllowingEveryPageSoNoindexStaysReadable(),
  'utf8'
)
await writeFile(
  join(CLIENT_DIR, '404.html'),
  noindexShellForUnknownPaths(template),
  'utf8'
)

console.info(
  `prerendered ${prerenderedPages.length} documents into ${CLIENT_DIR} at ${origin}`
)
