import type React from 'react'
import { Suspense, use } from 'react'

import type { Step } from '@/features/about/about'
import { PROFILE_PHOTO } from '@/features/profile/profile'
import {
  contactPathFor,
  projectsPathFor,
  useAboutData
} from '@/infrastructure/router/navigation'
import { Lid } from '@/presentation/components/lid'
import { Main } from '@/presentation/components/main'
import { Stamp, StampList } from '@/presentation/components/stamp'
import { Link } from '@/presentation/components/ui/link'
import { useIndexedPageTitle } from '@/presentation/head/use-document-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { apiErrorKey } from '@/presentation/i18n/translation'

import { TechLogo } from './tech-logo'

import './about-page.sass'

type TrackProps = {
  steps: Step[]
}

/** The path printed as a game board's track: one numbered square per step. */
const Track: React.FC<TrackProps> = ({ steps }) => (
  <ol className='track'>
    {steps.map((step, index) => (
      <li className='track-square' key={step.title}>
        <span aria-hidden='true' className='square-number'>
          {index + 1}
        </span>
        <div className='square-text'>
          <h3 className='square-title'>
            {step.title}
            <span className='square-mark'>{step.mark}</span>
          </h3>
          <p>{step.text}</p>
        </div>
      </li>
    ))}
  </ol>
)

const Toolbox: React.FC = () => {
  const { translate } = useI18n()
  const cv = use(useAboutData().cv)

  if (cv.status === 'failure') {
    return <p className='about-failure'>{translate(apiErrorKey(cv.error))}</p>
  }

  return (
    <dl className='toolbox'>
      {cv.data.skills.map((skill) => (
        <div className='toolbox-row' key={skill.group}>
          <dt>{skill.group}</dt>
          <dd>
            <StampList>
              {skill.terms.map((term) => (
                <Stamp key={term}>
                  <TechLogo term={term} />
                  {term}
                </Stamp>
              ))}
            </StampList>
          </dd>
        </div>
      ))}
    </dl>
  )
}

const Path: React.FC = () => {
  const { translate } = useI18n()
  const about = use(useAboutData().about)

  return about.status === 'failure' ? (
    <p className='about-failure'>{translate(apiErrorKey(about.error))}</p>
  ) : (
    <Track steps={about.data.steps} />
  )
}

export const AboutPage: React.FC = () => {
  const { locale, translate } = useI18n()
  useIndexedPageTitle('about')

  return (
    <Main className='about-page'>
      <Lid
        band={<p>{translate('about.lead')}</p>}
        title={translate('about.title')}
      />
      <div className='about-booklet'>
        <figure className='author-card'>
          <img
            alt={translate('cv.photo')}
            height={PROFILE_PHOTO.size}
            src={PROFILE_PHOTO.path}
            width={PROFILE_PHOTO.size}
          />
          <figcaption>{translate('about.credit')}</figcaption>
        </figure>
        <div className='about-text'>
          <section aria-labelledby='about-path' className='about-section'>
            <h2 className='about-heading' id='about-path'>
              {translate('about.path')}
            </h2>
            <Suspense fallback={<div aria-busy='true' className='pending' />}>
              <Path />
            </Suspense>
          </section>
          <section aria-labelledby='about-toolbox' className='about-section'>
            <h2 className='about-heading' id='about-toolbox'>
              {translate('about.toolbox')}
            </h2>
            <Suspense fallback={<div aria-busy='true' className='pending' />}>
              <Toolbox />
            </Suspense>
          </section>
          <div className='about-next'>
            <Link href={contactPathFor(locale)} variant='accent'>
              {translate('about.writeToMe')}
            </Link>
            <Link href={projectsPathFor(locale)}>
              {translate('about.seeProjects')}
            </Link>
          </div>
        </div>
      </div>
    </Main>
  )
}
