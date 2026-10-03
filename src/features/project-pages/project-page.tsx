import type React from 'react'
import { Suspense, use } from 'react'

import type { HousePackageName } from '@/features/packages/house-package'
import type { Project } from '@/features/projects/project'
import { NextEntry } from '@/features/register/next-entry'
import { isRegistered } from '@/features/register/this-site'
import { homePathFor, projectPathFor } from '@/infrastructure/router/navigation'
import { BlankEntry } from '@/presentation/blank-entry'
import { Main } from '@/presentation/components/main'
import { notFoundTitle, projectHead } from '@/presentation/head/document-head'
import { DocumentTitle } from '@/presentation/head/document-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { apiErrorKey } from '@/presentation/i18n/translation'
import { RouteFallback } from '@/presentation/route-fallback'

import { AppEntryPage } from './app-entry-page'
import type { Neighbour } from './neighbour-entries'
import { PackagesEntryPage } from './packages-entry-page'
import { useProjectData } from './project-loader'

import '@/features/register/register.sass'
import './project-page.sass'

const isPackagesEntry = (project: Project): boolean =>
  project.kind === 'library'

/** The register's order: the apps as the home page lists them, then the packages. */
const registerOrderOf = (projects: readonly Project[]): Project[] => [
  ...projects.filter(isRegistered),
  ...projects.filter(isPackagesEntry)
]

const ProjectTitle: React.FC = () => {
  const { translate } = useI18n()
  const project = use(useProjectData().project)

  return (
    <DocumentTitle>
      {project.status === 'success'
        ? projectHead(project.data).title
        : notFoundTitle(translate(apiErrorKey(project.error)))}
    </DocumentTitle>
  )
}

const ProjectEntry: React.FC = () => {
  const { locale, translate } = useI18n()
  const {
    project: projectRequest,
    projects: projectsRequest,
    housePackages: housePackagesRequest,
    plates: platesRequest
  } = useProjectData()
  const project = use(projectRequest)
  const projects = use(projectsRequest)
  const housePackages = use(housePackagesRequest)
  const plates = use(platesRequest)

  const failure =
    project.status === 'failure'
      ? project.error
      : projects.status === 'failure'
        ? projects.error
        : housePackages.status === 'failure'
          ? housePackages.error
          : null

  if (
    failure !== null ||
    project.status === 'failure' ||
    projects.status === 'failure' ||
    housePackages.status === 'failure'
  ) {
    return (
      <BlankEntry
        backHref={homePathFor(locale)}
        backLabel={translate('project.breadcrumb')}
        note={translate(apiErrorKey(failure ?? 'invalid_content'))}
        stamp={translate(
          failure === 'not_found' ? 'notFound.stamp' : 'error.stamp'
        )}
        title={translate(
          failure === 'not_found' ? 'notFound.title' : 'error.title'
        )}
      />
    )
  }

  const entry = project.data
  const order = registerOrderOf(projects.data)
  const index = order.findIndex((candidate) => candidate.slug === entry.slug)
  const neighbourAt = (at: number): Neighbour | null => {
    const neighbour = index === -1 ? undefined : order[at]

    return neighbour === undefined
      ? null
      : {
          href: projectPathFor({ locale, slug: neighbour.slug }),
          name: neighbour.name
        }
  }
  const registerHref = `${homePathFor(locale)}#${isPackagesEntry(entry) ? 'register' : entry.slug}`
  const packagesProject = projects.data.find(isPackagesEntry)
  const packageRowHref =
    packagesProject === undefined
      ? null
      : (name: HousePackageName) =>
          `${projectPathFor({ locale, slug: packagesProject.slug })}#package-${name}`

  if (isPackagesEntry(entry)) {
    return (
      <PackagesEntryPage
        above={neighbourAt(index - 1)}
        apps={projects.data.filter(isRegistered)}
        housePackages={housePackages.data}
        project={entry}
        registerHref={registerHref}
      />
    )
  }

  if (!isRegistered(entry)) {
    return (
      <BlankEntry
        backHref={homePathFor(locale)}
        backLabel={translate('project.breadcrumb')}
        note={translate(apiErrorKey('not_found'))}
        stamp={translate('notFound.stamp')}
        title={translate('notFound.title')}
      />
    )
  }

  return (
    <AppEntryPage
      above={neighbourAt(index - 1)}
      below={neighbourAt(index + 1)}
      housePackages={housePackages.data}
      packageRowHref={packageRowHref}
      plates={plates[entry.slug]}
      project={entry}
      registerHref={registerHref}
    />
  )
}

/** A register entry unfolded to its own page. */
export const ProjectPage: React.FC = () => (
  <Main className='project-page'>
    <Suspense fallback={<RouteFallback />}>
      <ProjectTitle />
      <ProjectEntry />
    </Suspense>
    <NextEntry />
  </Main>
)
