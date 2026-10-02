import type React from 'react'
import { Suspense, use } from 'react'

import { NextEntry } from '@/features/register/next-entry'
import { registerSpanOf } from '@/features/register/register-dates'
import { SITE_OPENED } from '@/features/register/this-site'
import { Main } from '@/presentation/components/main'
import { useIndexedPageTitle } from '@/presentation/head/use-document-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { apiErrorKey } from '@/presentation/i18n/translation'

import { useHomeData } from './home-loader'
import { RegisterHead } from './register-head'
import { ReleaseRegister } from './release-register'

import '@/features/register/register.sass'
import './home-page.sass'

/** The head and the register read the same content, once it has arrived. */
const Register: React.FC = () => {
  const { translate } = useI18n()
  const data = useHomeData()
  const projects = use(data.projects)
  const housePackages = use(data.housePackages)
  const plates = use(data.plates)

  if (projects.status === 'failure' || housePackages.status === 'failure') {
    const error =
      projects.status === 'failure'
        ? projects.error
        : housePackages.status === 'failure'
          ? housePackages.error
          : 'invalid_content'

    return <p className='register-failure'>{translate(apiErrorKey(error))}</p>
  }

  const apps = projects.data.flatMap((project) =>
    project.register === undefined ? [] : [project.register]
  )
  const span = registerSpanOf([
    SITE_OPENED,
    ...apps.map((app) => app.entered),
    ...housePackages.data.map((housePackage) => housePackage.released)
  ])

  return (
    <>
      <RegisterHead
        appCount={apps.length}
        firstEntry={span?.first ?? null}
        lastEntry={span?.last ?? null}
        packageCount={housePackages.data.length}
      />
      <ReleaseRegister
        housePackages={housePackages.data}
        plates={plates}
        projects={projects.data}
      />
    </>
  )
}

const AboutNote: React.FC = () => {
  const { translate } = useI18n()

  return (
    <section aria-labelledby='about-title' className='about-note'>
      <h2 className='section-label' id='about-title'>
        {translate('home.about.title')}
      </h2>
      <p>
        {translate('home.about.before')}{' '}
        <em>{translate('home.about.emphasis')}</em>{' '}
        {translate('home.about.after')}
      </p>
    </section>
  )
}

/** A register of releases: one dated row per app, then the house packages. */
export const HomePage: React.FC = () => {
  useIndexedPageTitle('home')

  return (
    <Main className='home-page'>
      <Suspense fallback={null}>
        <Register />
      </Suspense>
      <AboutNote />
      <NextEntry />
    </Main>
  )
}
