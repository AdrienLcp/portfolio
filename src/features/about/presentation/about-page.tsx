import type React from 'react'

import type { Step } from '@/features/about/domain/about'
import { useAboutData } from '@/features/about/infrastructure/about-loader'
import { ContactInvite } from '@/features/contact/contact-invite'
import { PROFILE_PHOTO } from '@/features/profile/profile'
import { isReleasedApp } from '@/features/project-pages/this-site'
import type { Project } from '@/features/projects/project'
import {
  homePathFor,
  projectPathFor,
  projectsPathFor
} from '@/infrastructure/router/navigation'
import { BlankEntry } from '@/presentation/blank-entry'
import { Main } from '@/presentation/components/main'
import { SiteLink } from '@/presentation/components/site-link/site-link'
import { IndexedPageTitle } from '@/presentation/head/indexed-page-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { apiErrorKey } from '@/presentation/i18n/translation'

import './about-page.sass'

type AboutHeroProps = {
  stack: string
}

/** The name, the job, how he got in, and that he is looking. */
const AboutHero: React.FC<AboutHeroProps> = ({ stack }) => {
  const { translate } = useI18n()

  return (
    <section aria-labelledby='about-name' className='about-hero'>
      <div className='about-hero-text'>
        <h1 className='about-name' id='about-name'>
          {translate('home.title')}
        </h1>
        <p className='about-role'>{translate('home.hero.role')}</p>
        <p className='about-lead'>{translate('about.lead')}</p>
        <div className='about-status'>
          <p>
            <strong>
              <span aria-hidden='true' className='about-open-dot' />
              {translate('home.hero.openToWork')}
            </strong>
            {translate('home.hero.place')}
          </p>
          <p className='about-stack'>{stack}</p>
        </div>
      </div>
      <img
        alt={translate('cv.photo')}
        className='about-photo'
        height={PROFILE_PHOTO.size}
        src={PROFILE_PHOTO.path}
        width={PROFILE_PHOTO.size}
      />
    </section>
  )
}

type PathStepProps = {
  index: number
  step: Step
}

const PathStep: React.FC<PathStepProps> = ({ index, step }) => {
  const titleId = `path-step-${index}`
  const isCurrent = step.state === 'current'

  return (
    <li className={isCurrent ? 'path-step current' : 'path-step'}>
      <article aria-labelledby={titleId} className='path-step-body'>
        <p className='path-when'>
          {isCurrent && <span aria-hidden='true' className='about-open-dot' />}
          <span>
            {step.mark}
            {step.markNote !== undefined && <small>{step.markNote}</small>}
          </span>
        </p>
        <div className='path-title'>
          <h3 className='path-name' id={titleId}>
            {step.title}
          </h3>
          <p className='path-where'>{step.where}</p>
        </div>
        <div className='path-story'>
          {step.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </li>
  )
}

type PathProps = {
  steps: Step[]
}

/** The whole road, oldest step first, the current one set apart. */
const Path: React.FC<PathProps> = ({ steps }) => {
  const { translate } = useI18n()

  return (
    <section aria-labelledby='path-title' className='about-section'>
      <h2 className='about-section-title' id='path-title'>
        {translate('about.path.title')}
      </h2>
      <ol className='path-steps'>
        {steps.map((step, index) => (
          <PathStep index={index + 1} key={step.title} step={step} />
        ))}
      </ol>
    </section>
  )
}

type EveningsProps = {
  firstApp: Project | undefined
}

const Evenings: React.FC<EveningsProps> = ({ firstApp }) => {
  const { locale, translate } = useI18n()

  return (
    <section
      aria-labelledby='evenings-title'
      className='about-section about-evenings'
    >
      <h2 className='about-section-title' id='evenings-title'>
        {translate('about.after.title')}
      </h2>
      <div className='evenings-text'>
        <p className='evenings-bridge'>{translate('about.after.bridge')}</p>
        <p className='evenings-off'>{translate('about.after.off')}</p>
        <div className='evenings-actions'>
          {firstApp !== undefined && (
            <SiteLink
              href={projectPathFor({ locale, slug: firstApp.slug })}
              icon='forward'
              variant='line'
            >
              {firstApp.name}
            </SiteLink>
          )}
          <SiteLink href={projectsPathFor(locale)} variant='caps'>
            {translate('about.after.allProjects')}
          </SiteLink>
        </div>
      </div>
    </section>
  )
}

const AboutCase: React.FC = () => {
  const { locale, translate } = useI18n()
  const { about, cv, projects } = useAboutData()

  if (projects.status === 'failure') {
    return (
      <BlankEntry
        backHref={homePathFor(locale)}
        backLabel={translate('notFound.backHome')}
        note={translate(apiErrorKey(projects.error))}
        title={translate('error.title')}
      />
    )
  }

  return (
    <>
      <AboutHero stack={cv.headline} />
      <Path steps={about.steps} />
      <Evenings firstApp={projects.data.find(isReleasedApp)} />
      <ContactInvite />
    </>
  )
}

/** The full road, from the stockroom to the job, and where the evenings go. */
export const AboutPage: React.FC = () => {
  return (
    <Main className='about-page'>
      <IndexedPageTitle page='about' />
      <AboutCase />
    </Main>
  )
}
