import type React from 'react'
import { Suspense, use } from 'react'

import type { Step } from '@/features/about/domain/about'
import { useAboutData } from '@/features/about/infrastructure/about-loader'
import { PROFILE_PHOTO } from '@/features/profile/profile'
import type { Project } from '@/features/projects/project'
import { NextEntry } from '@/features/register/next-entry'
import { isRegistered } from '@/features/register/this-site'
import {
  homePathFor,
  projectPathFor,
  registerPathFor
} from '@/infrastructure/router/navigation'
import { BlankEntry } from '@/presentation/blank-entry'
import { Icon } from '@/presentation/components/icon'
import { Main } from '@/presentation/components/main'
import { RegisterLink } from '@/presentation/components/register/register-link'
import { RubberStamp } from '@/presentation/components/register/rubber-stamp'
import { VisuallyHidden } from '@/presentation/components/ui/visually-hidden'
import { useIndexedPageTitle } from '@/presentation/head/use-document-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { apiErrorKey } from '@/presentation/i18n/translation'
import { RouteFallback } from '@/presentation/route-fallback'

import '@/features/register/register.sass'
import './about-page.sass'

type AboutHeadProps = {
  stack: string
}

const AboutHead: React.FC<AboutHeadProps> = ({ stack }) => {
  const { translate } = useI18n()

  return (
    <section aria-labelledby='about-name' className='about-head'>
      <div className='about-head-rule'>
        <p className='about-role'>
          <span>{translate('home.head.role')}</span>
          <span aria-hidden='true' className='dot'>
            ·
          </span>
          <span>{translate('home.head.place')}</span>
          <span aria-hidden='true' className='dot'>
            ·
          </span>
          <span className='open-mark'>
            <svg aria-hidden='true' focusable='false' viewBox='0 0 10 10'>
              <circle cx='5' cy='5' fill='currentColor' r='4' />
            </svg>
            {translate('home.head.openToWork')}
          </span>
        </p>
        <p className='about-stack'>{stack}</p>
      </div>
      <div className='about-head-text'>
        <h1 className='about-name' id='about-name'>
          {translate('home.title')}
        </h1>
        <p className='about-lead'>
          {translate('about.lead')} <span>{translate('about.leadSoft')}</span>
        </p>
      </div>
      <figure className='about-plate'>
        <img
          alt={translate('cv.photo')}
          height={PROFILE_PHOTO.size}
          src={PROFILE_PHOTO.path}
          width={PROFILE_PHOTO.size}
        />
        <figcaption>
          <span>{translate('about.plate')}</span>
          <span>{translate('home.head.place')}</span>
        </figcaption>
      </figure>
    </section>
  )
}

type PathStepProps = {
  index: number
  step: Step
}

const PathStep: React.FC<PathStepProps> = ({ index, step }) => {
  const { translate } = useI18n()
  const titleId = `path-step-${index}`

  return (
    <li className={`register-row path-step ${step.state}`}>
      <article aria-labelledby={titleId} className='path-columns path-entry'>
        <p className='entry-date path-date'>
          {step.mark}
          {step.markNote !== undefined && <small>{step.markNote}</small>}
        </p>
        <div className='path-title'>
          <h3 className='path-name' id={titleId}>
            {step.title}
          </h3>
          <p className='path-where'>{step.where}</p>
        </div>
        <div className='path-body'>
          {step.paragraphs.map((paragraph) => (
            <p className='path-text' key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className='path-state'>
          {step.state === 'current' ? (
            <RubberStamp
              description={translate('about.state.currentSince', {
                date: step.mark
              })}
              isFresh
              label={translate('about.state.current')}
              note={translate('about.state.since', { date: step.mark })}
              size='large'
            />
          ) : (
            <p className='path-state-word'>
              <Icon className='path-state-icon' name='check' />
              {translate(`about.state.${step.state}`)}
            </p>
          )}
        </div>
      </article>
    </li>
  )
}

type PathProps = {
  steps: Step[]
}

/** The whole route, set as register rows, oldest step first. */
const Path: React.FC<PathProps> = ({ steps }) => {
  const { translate } = useI18n()
  const count = String(steps.length)

  return (
    <section aria-labelledby='path-title' className='about-path'>
      <VisuallyHidden elementType='h2' id='path-title'>
        {translate('about.path.title')}
      </VisuallyHidden>
      <div aria-hidden='true' className='register-cap'>
        <div className='path-columns wide-head'>
          <span>{translate('about.path.when')}</span>
          <span>
            {translate('about.path.step')} · <b>{count}</b>
          </span>
          <span>{translate('about.path.happened')}</span>
          <span className='column-state'>{translate('about.path.state')}</span>
        </div>
        <div className='narrow-head'>
          <span>{translate('about.path.narrow')}</span>
          <span>{translate('about.path.count', { count })}</span>
        </div>
      </div>
      <ol className='register-rows'>
        {steps.map((step, index) => (
          <PathStep index={index + 1} key={step.title} step={step} />
        ))}
      </ol>
    </section>
  )
}

type EveningsProps = {
  firstEntry: Project | undefined
}

const Evenings: React.FC<EveningsProps> = ({ firstEntry }) => {
  const { locale, translate } = useI18n()

  return (
    <section aria-labelledby='evenings-title' className='about-evenings'>
      <VisuallyHidden elementType='h2' id='evenings-title'>
        {translate('about.after.title')}
      </VisuallyHidden>
      <p className='evenings-bridge'>{translate('about.after.bridge')}</p>
      <p className='evenings-links'>
        {firstEntry !== undefined && (
          <>
            <span className='entry-label'>
              {translate('about.after.firstEntry')}
            </span>
            <RegisterLink
              className='chip app-chip'
              href={projectPathFor({ locale, slug: firstEntry.slug })}
            >
              <span className='chip-label'>{firstEntry.name}</span>
              <Icon className='chip-icon' name='forward' />
            </RegisterLink>
          </>
        )}
        <RegisterLink
          className='evenings-register'
          href={registerPathFor(locale)}
        >
          {translate('about.after.wholeRegister')}
          <Icon className='register-link-icon' name='forward' />
        </RegisterLink>
      </p>
      <p className='evenings-off'>{translate('about.after.off')}</p>
    </section>
  )
}

const AboutCase: React.FC = () => {
  const { locale, translate } = useI18n()
  const {
    about: aboutRequest,
    cv: cvRequest,
    projects: projectsRequest
  } = useAboutData()
  const about = use(aboutRequest)
  const cv = use(cvRequest)
  const projects = use(projectsRequest)

  if (
    about.status === 'failure' ||
    cv.status === 'failure' ||
    projects.status === 'failure'
  ) {
    const error =
      about.status === 'failure'
        ? about.error
        : cv.status === 'failure'
          ? cv.error
          : projects.status === 'failure'
            ? projects.error
            : 'invalid_content'

    return (
      <BlankEntry
        backHref={homePathFor(locale)}
        backLabel={translate('notFound.backHome')}
        note={translate(apiErrorKey(error))}
        stamp={translate('error.stamp')}
        title={translate('error.title')}
      />
    )
  }

  return (
    <>
      <AboutHead stack={cv.data.headline} />
      <Path steps={about.data.steps} />
      <Evenings firstEntry={projects.data.find(isRegistered)} />
      <NextEntry />
    </>
  )
}

/** The full path, from the stockroom to the job, kept the way the register keeps apps. */
export const AboutPage: React.FC = () => {
  useIndexedPageTitle('about')

  return (
    <Main className='about-page'>
      <Suspense fallback={<RouteFallback />}>
        <AboutCase />
      </Suspense>
    </Main>
  )
}
