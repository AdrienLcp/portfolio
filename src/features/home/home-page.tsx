import type React from 'react'

import { ContactInvite } from '@/features/contact/contact-invite'
import { Main } from '@/presentation/components/main'
import { IndexedPageTitle } from '@/presentation/head/indexed-page-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { apiErrorKey } from '@/presentation/i18n/translation'

import { AboutBrief } from './about-brief'
import { HomeHero } from './home-hero'
import { useHomeData } from './home-loader'
import { PackageShelf } from './package-shelf'
import { ProjectIndex } from './project-index'

import './home-page.sass'

/** The index and the shelf read the same content. */
const Work: React.FC = () => {
  const { translate } = useI18n()
  const { projects, housePackages } = useHomeData()

  if (projects.status === 'failure') {
    return (
      <p className='home-failure'>{translate(apiErrorKey(projects.error))}</p>
    )
  }

  return (
    <>
      <ProjectIndex
        projects={projects.data.filter((project) => project.kind !== 'library')}
      />
      <PackageShelf
        housePackages={housePackages}
        packagesProject={projects.data.find(
          (project) => project.kind === 'library'
        )}
      />
    </>
  )
}

/** Who he is, the apps, the packages under them, then an invitation to write. */
export const HomePage: React.FC = () => (
  <Main className='home-page'>
    <IndexedPageTitle page='home' />
    <HomeHero />
    <Work />
    <AboutBrief />
    <ContactInvite />
  </Main>
)
