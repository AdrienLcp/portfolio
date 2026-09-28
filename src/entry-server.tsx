import { prerender } from 'react-dom/static'
import {
  createStaticHandler,
  createStaticRouter,
  generatePath,
  StaticRouterProvider
} from 'react-router'

import { PROFILE_PHOTO } from '@/features/profile/profile'
import { PROJECTS } from '@/infrastructure/api/data/projects'
import { fetchProfile, fetchProject } from '@/infrastructure/api/portfolio-api'
import {
  homePathFor,
  localizedPaths,
  projectPathFor
} from '@/infrastructure/router/navigation'
import { pageModuleFor, routes } from '@/infrastructure/router/routes'
import { AppProviders } from '@/presentation/app-providers'
import {
  IMAGE_ALTS,
  type IndexedPage,
  OPEN_GRAPH_LOCALES,
  PAGE_HEADS,
  type PageHead,
  projectHead
} from '@/presentation/head/document-head'
import { LOCALES, type Locale } from '@/presentation/i18n/locale'

export type PrerenderedPage = {
  locale: Locale
  /** How Vite's build manifest keys the chunk this page renders. */
  module: string
  /** What pairs a page with itself in the other language, for `hreflang`. */
  page: IndexedPage | `project:${string}`
  /** Where the document is served, from the site root: `/fr/about`. */
  path: string
}

export type RenderedPage = PageHead & {
  /** What goes inside `#root`, so there is something to paint before any script runs. */
  html: string
}

export { IMAGE_ALTS as imageAlts, OPEN_GRAPH_LOCALES as openGraphLocales }

/** The keys of the heads, which are typed over the routes. */
const INDEXED_PAGES = Object.keys(PAGE_HEADS.en) as IndexedPage[]

/**
 * The plain CV is left out on purpose: it is a printable copy of the CV page,
 * marked `noindex`, and served by the SPA fallback.
 */
const pagesFor = (locale: Locale): PrerenderedPage[] => [
  ...INDEXED_PAGES.map(
    (page): PrerenderedPage => ({
      locale,
      module: pageModuleFor(localizedPaths[page]),
      page,
      path: generatePath(localizedPaths[page], { locale })
    })
  ),
  ...PROJECTS.map(
    ({ slug }): PrerenderedPage => ({
      locale,
      module: pageModuleFor(localizedPaths.project),
      page: `project:${slug}`,
      path: projectPathFor({ locale, slug })
    })
  )
]

/** Read off the data, so a project added there gets its own document. */
export const prerenderedPages: PrerenderedPage[] = LOCALES.flatMap(pagesFor)

const headFor = async ({
  locale,
  page
}: PrerenderedPage): Promise<PageHead> => {
  if (!page.startsWith('project:')) {
    return PAGE_HEADS[locale][page as IndexedPage]
  }

  const project = await fetchProject({
    locale,
    slug: page.slice('project:'.length)
  })

  if (project.status === 'failure') {
    throw new Error(`${page} could not be read: ${project.error}`)
  }

  return projectHead(project.data)
}

const handler = createStaticHandler(routes)

/** Every region that is still waiting paints one of these. */
const PENDING_MARKERS = ['aria-busy="true"', '<template']

/**
 * `prerender` rather than `renderToStaticMarkup`: loaders hand back unawaited
 * promises read with `use`, and only `prerender` waits for every Suspense
 * boundary to resolve instead of writing its fallback into the document.
 */
export const renderPage = async (
  prerendered: PrerenderedPage
): Promise<RenderedPage> => {
  const { locale, path } = prerendered
  const context = await handler.query(new Request(`http://prerender${path}`))

  if (context instanceof Response) {
    throw new Error(
      `${path} answered with ${context.status} rather than with a page`
    )
  }

  // `dataRoutes` is the tree `query` resolved every `lazy` into; handed the
  // original, the router has no component to mount.
  const { prelude } = await prerender(
    <AppProviders locale={locale}>
      <StaticRouterProvider
        context={context}
        hydrate={false}
        router={createStaticRouter(handler.dataRoutes, context)}
      />
    </AppProviders>,
    // Otherwise a boundary that resolves after the shell is written out of
    // place, behind a `<template>` and an inline script that moves it: markup
    // `createRoot` throws away, with the pending state standing in its spot.
    { progressiveChunkSize: Number.POSITIVE_INFINITY }
  )
  const html = await new Response(prelude).text()

  if (PENDING_MARKERS.some((marker) => html.includes(marker))) {
    throw new Error(`${path} rendered a pending state rather than its content`)
  }

  return { ...(await headFor(prerendered)), html }
}

/**
 * Who the site is about, in the language of the document: a search engine
 * reads it to tie the pages, the photo and the profiles to one person.
 */
export const structuredDataFor = async ({
  locale,
  origin
}: {
  locale: Locale
  origin: string
}): Promise<object> => {
  const profile = await fetchProfile(locale)

  if (profile.status === 'failure') {
    throw new Error(`The profile could not be read: ${profile.error}`)
  }

  const { links, name, role } = profile.data
  const home = `${origin}${homePathFor(locale)}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': `${origin}/#person`,
        '@type': 'Person',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'FR',
          addressLocality: 'Nantes'
        },
        image: `${origin}${PROFILE_PHOTO.path}`,
        jobTitle: role,
        name,
        sameAs: [links.github, links.linkedin],
        url: home
      },
      {
        '@id': `${origin}/#website`,
        '@type': 'WebSite',
        author: { '@id': `${origin}/#person` },
        inLanguage: locale,
        name,
        url: home
      }
    ]
  }
}
