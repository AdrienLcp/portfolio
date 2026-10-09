import type React from 'react'

import { ContactInvite } from '@/features/contact/contact-invite'
import type { HousePackageName } from '@/features/packages/house-package'
import { isReleasedApp } from '@/features/project-pages/this-site'
import type { Project } from '@/features/projects/project'
import {
  projectPathFor,
  projectsPathFor
} from '@/infrastructure/router/navigation'
import { BlankEntry } from '@/presentation/blank-entry'
import { Main } from '@/presentation/components/main'
import { notFoundTitle, projectHead } from '@/presentation/head/document-head'
import { DocumentTitle } from '@/presentation/head/document-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { apiErrorKey } from '@/presentation/i18n/translation'

import { AppPage } from './app-page'
import type { Neighbour } from './neighbour-projects'
import { packageRowIdOf } from './package-table'
import { PackagesPage } from './packages-page'
import { useProjectData } from './project-loader'

import './project-page.sass'

const isPackagesProject = (project: Project): boolean =>
  project.kind === 'library'

/** The order the home page lists them in: the apps, then the packages. */
const listedOrderOf = (projects: readonly Project[]): Project[] => [
  ...projects.filter(isReleasedApp),
  ...projects.filter(isPackagesProject)
]

const ProjectTitle: React.FC = () => {
  const { translate } = useI18n()
  const { project } = useProjectData()

  return (
    <DocumentTitle>
      {project.status === 'success'
        ? projectHead(project.data).title
        : notFoundTitle(translate(apiErrorKey(project.error)))}
    </DocumentTitle>
  )
}

const ProjectDetail: React.FC = () => {
  const { locale, translate } = useI18n()
  const { project, projects, housePackages, plates } = useProjectData()

  const failure =
    project.status === 'failure'
      ? project.error
      : projects.status === 'failure'
        ? projects.error
        : null

  if (
    failure !== null ||
    project.status === 'failure' ||
    projects.status === 'failure'
  ) {
    return (
      <BlankEntry
        backHref={projectsPathFor(locale)}
        backLabel={translate('project.breadcrumb')}
        note={translate(apiErrorKey(failure ?? 'invalid_content'))}
        title={translate(
          failure === 'not_found' ? 'notFound.title' : 'error.title'
        )}
      />
    )
  }

  const shown = project.data
  const order = listedOrderOf(projects.data)
  const index = order.findIndex((candidate) => candidate.slug === shown.slug)
  const neighbourAt = (at: number): Neighbour | null => {
    const neighbour = index === -1 ? undefined : order[at]

    return neighbour === undefined
      ? null
      : {
          href: projectPathFor({ locale, slug: neighbour.slug }),
          name: neighbour.name
        }
  }
  const packagesProject = projects.data.find(isPackagesProject)
  const packageRowHref =
    packagesProject === undefined
      ? null
      : (name: HousePackageName) =>
          `${projectPathFor({ locale, slug: packagesProject.slug })}#${packageRowIdOf(name)}`

  if (isPackagesProject(shown)) {
    return (
      <PackagesPage
        apps={projects.data.filter(isReleasedApp)}
        housePackages={housePackages}
        previous={neighbourAt(index - 1)}
        project={shown}
      />
    )
  }

  if (!isReleasedApp(shown)) {
    return (
      <BlankEntry
        backHref={projectsPathFor(locale)}
        backLabel={translate('project.breadcrumb')}
        note={translate(apiErrorKey('not_found'))}
        title={translate('notFound.title')}
      />
    )
  }

  return (
    <AppPage
      housePackages={housePackages}
      next={neighbourAt(index + 1)}
      packageRowHref={packageRowHref}
      plates={plates[shown.slug]}
      previous={neighbourAt(index - 1)}
      project={shown}
    />
  )
}

/** A project on its own page, then the invitation to write. */
export const ProjectPage: React.FC = () => (
  <Main className='project-page'>
    <ProjectTitle />
    <ProjectDetail />
    <ContactInvite />
  </Main>
)
