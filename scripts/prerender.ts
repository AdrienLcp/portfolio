import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import type { PrerenderedPage, RenderedPage } from '../src/entry-server'
import type { Locale } from '../src/presentation/i18n/locale'

type EntryServer = {
  imageAlts: Record<Locale, string>
  openGraphLocales: Record<Locale, string>
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

/** What the build emitted for each source module: the stylesheet a page's chunk carries. */
const VITE_MANIFEST_FILE = '.vite/manifest.json'

type BuildChunk = {
  css?: string[]
  file: string
  imports?: string[]
}

/**
 * Every replacement must match exactly once. `index.html` stays a valid
 * standalone document, since `pnpm dev` and the SPA fallback serve it, so there
 * are no placeholders: a tag edited out of it fails the build instead of
 * leaving every document with the wrong head.
 */
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
  key,
  value
}: {
  html: string
  /** The attribute that identifies the tag: `name="description"`, `property="og:title"`. */
  key: string
  value: string
}): string =>
  replaceOnce({
    html,
    pattern: new RegExp(String.raw`<meta\s+content="[^"]*"\s+${key}\s*/>`),
    replacement: `<meta content="${escapeAttribute(value)}" ${key} />`
  })

const CANONICAL = /<link\s+href="[^"]*"\s+rel="canonical"\s*\/>/

/** Read off the template's canonical link, the one place a host is written down. */
const originOf = (template: string): string => {
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

/** `/en` → `en.html`, `/fr/about` → `fr/about.html`. */
const fileFor = (path: string): string => `${path.slice(1)}.html`

/** Every `<link rel="stylesheet">` the build emitted, as one run a `<style>` replaces. */
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

/** A chunk and everything it statically imports, imports first. */
const chunksFor = ({
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
      chunksFor({ module: imported, seen })
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

/**
 * What the template links plus what the page's own lazy chunk carries: the
 * document holds the whole page's markup, so inlining only the first would
 * paint it half-styled until the bundle arrives.
 */
const inlineStylesFor = async (module: string): Promise<string> => {
  const hrefs = [
    ...new Set([
      ...templateStylesheets,
      ...chunksFor({ module, seen: new Set() }).flatMap((chunk) =>
        (chunk.css ?? []).map((file) => `/${file}`)
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

/**
 * The page's own chunk, which the router only reaches through a dynamic import
 * once the entry has run: named here, it downloads with everything else.
 */
const preloadsFor = (module: string): string =>
  chunksFor({ module, seen: new Set() })
    .map((chunk) => `/${chunk.file}`)
    .filter((href) => !alreadyRequested.has(href))
    .map(
      (href) => `\n    <link rel="modulepreload" crossorigin href="${href}">`
    )
    .join('')

/** `<` escaped, so no string in the data can close the script it sits in. */
const jsonLd = (data: object): string =>
  `<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>`

const documentFor = ({
  page,
  preloads,
  rendered,
  siblings,
  structuredData,
  styles
}: {
  page: PrerenderedPage
  preloads: string
  rendered: RenderedPage
  /** The same page in every language, this one included: `hreflang` must be reciprocal. */
  siblings: PrerenderedPage[]
  structuredData: object
  styles: string
}): string => {
  const url = `${origin}${page.path}`

  const alternates = [
    ...siblings.map(
      (sibling) =>
        `<link href="${origin}${sibling.path}" hreflang="${sibling.locale}" rel="alternate" />`
    ),
    // The root negotiates and redirects: where a crawler with no match is sent.
    `<link href="${origin}/" hreflang="x-default" rel="alternate" />`
  ].join('\n    ')

  const alternateOpenGraphLocales = siblings
    .filter((sibling) => sibling.locale !== page.locale)
    .map(
      (sibling) =>
        `<meta content="${openGraphLocales[sibling.locale]}" property="og:locale:alternate" />`
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
      setMeta({ html, key: 'name="description"', value: rendered.description }),
    (html: string) =>
      replaceOnce({
        html,
        pattern: CANONICAL,
        replacement: `<link href="${url}" rel="canonical" />\n    ${alternates}`
      }),
    (html: string) =>
      setMeta({ html, key: 'property="og:title"', value: rendered.title }),
    (html: string) =>
      setMeta({
        html,
        key: 'property="og:description"',
        value: rendered.description
      }),
    (html: string) => setMeta({ html, key: 'property="og:url"', value: url }),
    (html: string) =>
      setMeta({
        html,
        key: 'property="og:image:alt"',
        value: imageAlts[page.locale]
      }),
    (html: string) =>
      setMeta({
        html,
        key: 'property="og:locale"',
        value: openGraphLocales[page.locale]
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
        replacement: `${preloadedModules}${preloads}`
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

/** One `<url>` per document, each listing every language it exists in. */
const sitemapFor = (pages: PrerenderedPage[]): string => {
  const urls = pages.map((page) => {
    const alternates = siblingsOf(page)
      .map(
        (sibling) =>
          `    <xhtml:link rel="alternate" hreflang="${sibling.locale}" href="${origin}${sibling.path}"/>`
      )
      .join('\n')

    return `  <url>\n    <loc>${origin}${page.path}</loc>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}/"/>\n  </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`
}

/** Nothing is disallowed: the one page kept out of the index says so itself, with `noindex`, which a crawler can only read if it may fetch it. */
const robotsFor = (): string =>
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`

/**
 * What Pages answers, with a 404 status, on any path without a file. It is the
 * bare shell rather than a prerendered page: the not-found page names the path
 * that was asked for, which no build can know, so the app renders it.
 */
const notFoundDocumentFor = (shell: string): string =>
  replaceOnce({
    html: shell,
    pattern: /<\/head>/,
    replacement: '  <meta name="robots" content="noindex" />\n  </head>'
  })

const template = await readFile(join(CLIENT_DIR, 'index.html'), 'utf8')
const origin = originOf(template)
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
  openGraphLocales,
  prerenderedPages,
  renderPage,
  structuredDataFor
}: EntryServer = await import(pathToFileURL(SERVER_ENTRY).href)

const siblingsOf = (page: PrerenderedPage): PrerenderedPage[] =>
  prerenderedPages.filter((candidate) => candidate.page === page.page)

for (const page of prerenderedPages) {
  const destination = join(CLIENT_DIR, fileFor(page.path))

  await mkdir(dirname(destination), { recursive: true })
  await writeFile(
    destination,
    documentFor({
      page,
      preloads: preloadsFor(page.module),
      rendered: await renderPage(page),
      siblings: siblingsOf(page),
      structuredData: await structuredDataFor({ origin, page }),
      styles: await inlineStylesFor(page.module)
    }),
    'utf8'
  )
}

await writeFile(
  join(CLIENT_DIR, 'sitemap.xml'),
  sitemapFor(prerenderedPages),
  'utf8'
)
await writeFile(join(CLIENT_DIR, 'robots.txt'), robotsFor(), 'utf8')
await writeFile(
  join(CLIENT_DIR, '404.html'),
  notFoundDocumentFor(template),
  'utf8'
)

console.info(
  `prerendered ${prerenderedPages.length} documents into ${CLIENT_DIR} at ${origin}`
)
