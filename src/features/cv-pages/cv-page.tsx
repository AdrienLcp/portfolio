import type React from 'react'
import { Suspense, use } from 'react'

import type { Cv } from '@/features/cv/cv'
import { displayUrl, formatPeriod, formatPhone } from '@/features/cv/cv-format'
import { cvPdfPath } from '@/features/cv/cv-pdf-path'
import { useCvData } from '@/features/cv-pages/cv-loader'
import { PROFILE_PHOTO, type Profile } from '@/features/profile/profile'
import { homePathFor } from '@/infrastructure/router/navigation'
import { BlankEntry } from '@/presentation/blank-entry'
import { Main } from '@/presentation/components/main'
import { RegisterLink } from '@/presentation/components/register/register-link'
import { IndexedPageTitle } from '@/presentation/head/indexed-page-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { apiErrorKey } from '@/presentation/i18n/translation'
import { RouteFallback } from '@/presentation/route-fallback'

import './cv-page.sass'

const CvHead: React.FC = () => {
  const { locale, translate } = useI18n()

  return (
    <section aria-labelledby='cv-title' className='cv-head'>
      <h1 className='cv-title' id='cv-title'>
        {translate('header.cv')}
      </h1>
      <div className='cv-tools'>
        <div className='cv-downloads'>
          <RegisterLink
            download
            href={cvPdfPath({ isPlain: false, locale })}
            icon='download'
            variant='ink'
          >
            {translate('cv.download')}
          </RegisterLink>
          <RegisterLink
            download
            href={cvPdfPath({ isPlain: true, locale })}
            icon='lines'
            variant='line'
          >
            {translate('cv.downloadPlain')}
          </RegisterLink>
        </div>
        <p className='cv-tools-note'>{translate('cv.plainNote')}</p>
      </div>
    </section>
  )
}

type CvSheetProps = {
  cv: Cv
  profile: Profile
}

/**
 * The CV as a recruiter expects it: identity on top, contact and skills on
 * the side, the record in the main column. Printed, the same sheet becomes
 * the designed PDF, on one A4 page.
 */
const CvSheet: React.FC<CvSheetProps> = ({ cv, profile }) => {
  const { locale, translate } = useI18n()
  const present = translate('cv.present')
  const contacts = [
    {
      href: `mailto:${cv.contact.email}`,
      label: translate('cv.email'),
      value: cv.contact.email
    },
    {
      href: `tel:${cv.contact.phone}`,
      label: translate('cv.phone'),
      value: formatPhone(cv.contact.phone, locale)
    },
    { href: null, label: translate('cv.location'), value: cv.contact.location },
    {
      href: cv.contact.website,
      label: translate('cv.website'),
      value: displayUrl(cv.contact.website)
    },
    {
      href: profile.links.github,
      label: translate('common.github'),
      value: displayUrl(profile.links.github)
    },
    {
      href: profile.links.linkedin,
      label: translate('common.linkedin'),
      value: displayUrl(profile.links.linkedin)
    }
  ]

  return (
    <article aria-labelledby='cv-name' className='cv-sheet'>
      <header className='cv-top'>
        <h2 className='cv-name' id='cv-name'>
          {profile.name}
        </h2>
        <p className='cv-role'>
          <span>{cv.title}</span>
          <span aria-hidden='true' className='dot'>
            ·
          </span>
          <span className='cv-stack'>{cv.headline}</span>
        </p>
        <p className='cv-open'>
          <svg aria-hidden='true' focusable='false' viewBox='0 0 10 10'>
            <circle cx='5' cy='5' fill='currentColor' r='4' />
          </svg>
          <span>{translate('home.head.openToWork')}</span>
        </p>
      </header>

      <div className='cv-columns'>
        <aside
          aria-label={translate('cv.sections.contact')}
          className='cv-aside'
        >
          <img
            alt={translate('cv.photo')}
            className='cv-photo'
            height={PROFILE_PHOTO.size}
            src={PROFILE_PHOTO.path}
            width={PROFILE_PHOTO.size}
          />

          <section aria-labelledby='cv-contact'>
            <h3 className='cv-heading' id='cv-contact'>
              {translate('cv.sections.contact')}
            </h3>
            <dl className='cv-list cv-contact'>
              {contacts.map((contact) => (
                <div key={contact.label}>
                  <dt>{contact.label}</dt>
                  <dd>
                    {contact.href === null ? (
                      contact.value
                    ) : (
                      <a href={contact.href}>{contact.value}</a>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby='cv-specs'>
            <h3 className='cv-heading' id='cv-specs'>
              {translate('cv.sections.specs')}
            </h3>
            <dl className='cv-list cv-inline'>
              {cv.specs.map((spec) => (
                <div key={spec.label}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby='cv-skills'>
            <h3 className='cv-heading' id='cv-skills'>
              {translate('cv.sections.skills')}
            </h3>
            <dl className='cv-list cv-inline'>
              {cv.skills.map((skill) => (
                <div key={skill.group}>
                  <dt>{skill.group}</dt>
                  <dd>{skill.terms.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby='cv-education'>
            <h3 className='cv-heading' id='cv-education'>
              {translate('cv.sections.education')}
            </h3>
            {cv.education.map((entry) => (
              <div className='cv-education' key={entry.school}>
                <p>
                  <b>{entry.title}</b>, {entry.school} · {entry.year}
                </p>
                <p className='cv-soft'>{entry.detail}</p>
              </div>
            ))}
          </section>

          <section aria-labelledby='cv-interests'>
            <h3 className='cv-heading' id='cv-interests'>
              {translate('cv.sections.interests')}
            </h3>
            <ul className='cv-plain-list'>
              {cv.extras.map((extra) => (
                <li key={extra}>{extra}</li>
              ))}
            </ul>
          </section>
        </aside>

        <div className='cv-main'>
          <section aria-labelledby='cv-profile'>
            <h3 className='cv-heading' id='cv-profile'>
              {translate('cv.sections.summary')}
            </h3>
            <p className='cv-summary'>{cv.summary}</p>
          </section>

          <section aria-labelledby='cv-experience'>
            <h3 className='cv-heading' id='cv-experience'>
              {translate('cv.sections.experience')}
            </h3>
            {cv.jobs.map((job) => (
              <div className='cv-job' key={job.employer}>
                <div className='cv-entry-head'>
                  <h4 className='cv-job-title'>
                    {job.title}{' '}
                    <span>
                      · {job.employer}, {job.place}
                    </span>
                  </h4>
                  <p className='cv-when'>
                    {formatPeriod({ locale, period: job.period, present })}
                  </p>
                </div>
                {job.points.length > 0 && (
                  <ul className='cv-points'>
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
                {job.missions.map((mission) => (
                  <div className='cv-mission' key={mission.title}>
                    <div className='cv-entry-head'>
                      <h5 className='cv-mission-title'>{mission.title}</h5>
                      {mission.period !== undefined && (
                        <p className='cv-when'>
                          {formatPeriod({
                            locale,
                            period: mission.period,
                            present
                          })}
                        </p>
                      )}
                    </div>
                    <p className='cv-soft'>{mission.summary}</p>
                    {mission.points.length > 0 && (
                      <ul className='cv-points'>
                        {mission.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </section>

          <section aria-labelledby='cv-projects'>
            <h3 className='cv-heading' id='cv-projects'>
              {translate('cv.sections.projects')}
            </h3>
            <ul className='cv-projects'>
              {cv.projects.map((project) => (
                <li key={project.name}>
                  <div className='cv-entry-head'>
                    <h4 className='cv-project-name'>{project.name}</h4>
                    <p className='cv-when'>{project.year}</p>
                  </div>
                  <p>{project.summary}</p>
                  <a className='cv-project-link' href={project.link}>
                    {displayUrl(project.link)}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  )
}

const CvCase: React.FC = () => {
  const { locale, translate } = useI18n()
  const { cv: cvRequest, profile: profileRequest } = useCvData()
  const cv = use(cvRequest)
  const profile = use(profileRequest)

  if (cv.status === 'success' && profile.status === 'success') {
    return (
      <>
        <CvHead />
        <div className='cv-desk'>
          <CvSheet cv={cv.data} profile={profile.data} />
        </div>
      </>
    )
  }

  const error = cv.status === 'failure' ? cv.error : 'invalid_content'

  return (
    <BlankEntry
      backHref={homePathFor(locale)}
      backLabel={translate('notFound.backHome')}
      note={translate(apiErrorKey(error))}
      stamp={translate(
        error === 'not_found' ? 'notFound.stamp' : 'error.stamp'
      )}
      title={translate(
        error === 'not_found' ? 'notFound.title' : 'error.title'
      )}
    />
  )
}

export const CvPage: React.FC = () => {
  return (
    <Main className='cv-page'>
      <IndexedPageTitle page='cv' />
      <Suspense fallback={<RouteFallback />}>
        <CvCase />
      </Suspense>
    </Main>
  )
}
