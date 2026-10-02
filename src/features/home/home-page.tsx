import type React from 'react'
import { Suspense, use } from 'react'

import { cvPdfPath } from '@/features/cv/cv-pdf-path'
import { currentYear } from '@/infrastructure/clock'
import { contactPathFor } from '@/infrastructure/router/navigation'
import { Main } from '@/presentation/components/main'
import { RegisterLink } from '@/presentation/components/register/register-link'
import { useIndexedPageTitle } from '@/presentation/head/use-document-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { apiErrorKey } from '@/presentation/i18n/translation'

import { useHomeData } from './home-loader'
import { registerSpanOf } from './register-dates'
import { RegisterHead } from './register-head'
import { ReleaseRegister } from './release-register'
import { StampInk } from './release-stamp'
import { SITE_OPENED } from './site-entry'

import './home-page.sass'

/** The head and the register read the same content, once it has arrived. */
const Register: React.FC = () => {
  const { translate } = useI18n()
  const data = useHomeData()
  const projects = use(data.projects)
  const housePackages = use(data.housePackages)

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

/** The register's last line, left blank for the reader's team to fill. */
const NextEntry: React.FC = () => {
  const { locale, translate } = useI18n()

  return (
    <section aria-labelledby='next-title' className='next-entry'>
      <h2 className='section-label' id='next-title'>
        {translate('home.next.title')}
      </h2>
      <div>
        <p className='next-line'>
          {translate('home.next.line')}{' '}
          <span aria-hidden='true' className='blank' /> {currentYear()}
        </p>
        <p className='next-note'>{translate('home.next.note')}</p>
      </div>
      <div className='next-actions'>
        <RegisterLink href={contactPathFor(locale)} icon='mail' variant='ink'>
          {translate('home.next.write')}
        </RegisterLink>
        <RegisterLink
          download
          href={cvPdfPath({ isPlain: false, locale })}
          icon='download'
          variant='line'
        >
          {translate('home.next.cvPdf')}
        </RegisterLink>
        <RegisterLink
          download
          href={cvPdfPath({ isPlain: true, locale })}
          icon='download'
          variant='line'
        >
          {translate('home.next.cvAts')}
        </RegisterLink>
      </div>
    </section>
  )
}

/** A register of releases: one dated row per app, then the house packages. */
export const HomePage: React.FC = () => {
  useIndexedPageTitle('home')

  return (
    <Main className='home-page'>
      <StampInk />
      <Suspense fallback={null}>
        <Register />
      </Suspense>
      <AboutNote />
      <NextEntry />
    </Main>
  )
}
