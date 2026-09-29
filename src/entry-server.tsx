import { prerender } from 'react-dom/static'
import {
  createStaticHandler,
  createStaticRouter,
  generatePath,
  StaticRouterProvider
} from 'react-router'

import { PROFILE_PHOTO } from '@/features/profile/profile'
import { fetchProfile } from '@/features/profile/profile-api'
import type { Project } from '@/features/projects/project'
import { fetchProject } from '@/features/projects/projects-api'
import { PROJECTS } from '@/features/projects/projects-content'
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
  openGraphLocaleFor,
  PAGE_HEADS,
  type PageHead,
  projectHead
} from '@/presentation/head/document-head'
import { LOCALES, type Locale } from '@/presentation/i18n/locale'

export type PrerenderedPage = {
  locale: Locale
  module: string
  page: IndexedPage | `project:${string}`
  path: string
}

export type RenderedPage = PageHead & {
  html: string
}

export { IMAGE_ALTS as imageAlts, openGraphLocaleFor }

const PROJECT_PAGE_PREFIX = 'project:'

const INDEXED_PAGES = Object.keys(PAGE_HEADS.en) as IndexedPage[]

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
      page: `${PROJECT_PAGE_PREFIX}${slug}`,
      path: projectPathFor({ locale, slug })
    })
  )
]

export const prerenderedPages: PrerenderedPage[] = LOCALES.flatMap(pagesFor)

const isProjectPage = (
  page: PrerenderedPage['page']
): page is `project:${string}` => page.startsWith(PROJECT_PAGE_PREFIX)

const projectOf = async ({
  locale,
  page
}: {
  locale: Locale
  page: `project:${string}`
}): Promise<Project> => {
  const project = await fetchProject({
    locale,
    slug: page.slice(PROJECT_PAGE_PREFIX.length)
  })

  if (project.status === 'failure') {
    throw new Error(`${page} could not be read: ${project.error}`)
  }

  return project.data
}

const headFor = async ({ locale, page }: PrerenderedPage): Promise<PageHead> =>
  isProjectPage(page)
    ? projectHead(await projectOf({ locale, page }))
    : PAGE_HEADS[locale][page]

const handler = createStaticHandler(routes)

const WAIT_FOR_EVERY_BOUNDARY_IN_PLACE = {
  progressiveChunkSize: Number.POSITIVE_INFINITY
}

const PENDING_MARKERS = ['aria-busy="true"', '<template']

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

  const lazyResolvedRoutes = handler.dataRoutes
  const { prelude } = await prerender(
    <AppProviders locale={locale}>
      <StaticRouterProvider
        context={context}
        hydrate={false}
        router={createStaticRouter(lazyResolvedRoutes, context)}
      />
    </AppProviders>,
    WAIT_FOR_EVERY_BOUNDARY_IN_PLACE
  )
  const html = await new Response(prelude).text()

  if (PENDING_MARKERS.some((marker) => html.includes(marker))) {
    throw new Error(`${path} rendered a pending state rather than its content`)
  }

  return { ...(await headFor(prerendered)), html }
}

const projectNodeFor = ({
  locale,
  origin,
  path,
  project
}: {
  locale: Locale
  origin: string
  path: string
  project: Project
}): object => ({
  '@id': `${origin}${path}#project`,
  '@type': 'SoftwareSourceCode',
  author: { '@id': `${origin}/#person` },
  codeRepository: project.links.repository,
  description: project.summary,
  inLanguage: locale,
  isPartOf: { '@id': `${origin}/#website` },
  keywords: project.stack,
  name: project.name,
  ...(project.links.live && {
    targetProduct: {
      '@type': 'WebApplication',
      name: project.name,
      url: project.links.live
    }
  }),
  url: `${origin}${path}`
})

export const structuredDataFor = async ({
  origin,
  page: { locale, page, path }
}: {
  origin: string
  page: PrerenderedPage
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
      },
      ...(isProjectPage(page)
        ? [
            projectNodeFor({
              locale,
              origin,
              path,
              project: await projectOf({ locale, page })
            })
          ]
        : [])
    ]
  }
}
