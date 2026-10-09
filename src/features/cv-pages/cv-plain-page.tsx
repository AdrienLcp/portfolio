import type React from 'react'

import type { Cv } from '@/features/cv/cv'
import { displayUrl, formatPeriod, formatPhone } from '@/features/cv/cv-format'
import { useCvData } from '@/features/cv-pages/cv-loader'
import type { Profile } from '@/features/profile/profile'
import { Main } from '@/presentation/components/main'
import { IndexedPageTitle } from '@/presentation/head/indexed-page-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'

import './cv-plain-page.sass'

type CvPlainProps = {
  cv: Cv
  profile: Profile
}

/**
 * The same CV for recruitment software: one column, standard headings, plain
 * text in reading order, every URL spelled out. Only its PDF is linked; the page itself stays noindex.
 */
const CvPlain: React.FC<CvPlainProps> = ({ cv, profile }) => {
  const { locale, translate } = useI18n()
  const labelSeparator = translate('cv.labelSeparator')

  return (
    <article className='cv-plain'>
      <h1>{profile.name}</h1>
      <p className='cv-plain-title'>
        {cv.title} · {cv.headline}
      </p>
      <p>
        {cv.contact.location} · {translate('cv.phone')}{' '}
        {formatPhone(cv.contact.phone, locale)} · {translate('cv.email')}{' '}
        {cv.contact.email}
      </p>
      <p>
        {[cv.contact.website, profile.links.github, profile.links.linkedin]
          .map(displayUrl)
          .join(' · ')}
      </p>

      <h2>{translate('cv.sections.summary')}</h2>
      <p>{cv.summary}</p>

      <h2>{translate('cv.sections.experience')}</h2>
      {cv.jobs.map((job) => (
        <section key={job.employer}>
          <h3>
            {job.title}, {job.employer}, {job.place} (
            {formatPeriod(job.period, translate)})
          </h3>
          {job.missions.map((mission) => (
            <div className='cv-plain-mission' key={mission.title}>
              <p>
                <strong>{mission.title}</strong>
                {mission.period !== undefined &&
                  ` (${formatPeriod(mission.period, translate)})`}
                {`. ${mission.summary}`}
              </p>
              {mission.points.length > 0 && (
                <ul>
                  {mission.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <ul>
            {job.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
      ))}

      <h2>{translate('cv.sections.projects')}</h2>
      <ul>
        {cv.projects.map((project) => (
          <li key={project.name}>
            <strong>{project.name}</strong> ({project.year},{' '}
            {displayUrl(project.link)}). {project.summary}
          </li>
        ))}
      </ul>

      <h2>{translate('cv.sections.skills')}</h2>
      <ul>
        {cv.skills.map((skill) => (
          <li key={skill.group}>
            <strong>{skill.group}</strong>
            {labelSeparator}
            {skill.terms.join(', ')}
          </li>
        ))}
      </ul>

      <h2>{translate('cv.sections.education')}</h2>
      {cv.education.map((entry) => (
        <p key={entry.school}>
          <strong>{entry.title}</strong>, {entry.school}, {entry.year}.{' '}
          {entry.detail}.
        </p>
      ))}

      <h2>{translate('cv.sections.extras')}</h2>
      <p>
        {cv.specs
          .map((spec) => `${spec.label}${labelSeparator}${spec.value}`)
          .join(' · ')}
      </p>
      <p>{cv.extras.join(' · ')}</p>
    </article>
  )
}

export const CvPlainPage: React.FC = () => {
  const { cv, profile } = useCvData()

  return (
    <Main className='cv-plain-page'>
      <IndexedPageTitle page='cv' />
      <meta content='noindex' name='robots' />
      <CvPlain cv={cv} profile={profile} />
    </Main>
  )
}
