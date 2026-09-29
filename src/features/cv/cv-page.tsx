import type React from 'react'
import { Suspense, use } from 'react'

import type { Cv } from '@/features/cv/cv'
import {
  cvPdfPath,
  displayUrl,
  formatPeriod,
  formatPhone
} from '@/features/cv/cv-format'
import { useCvData } from '@/features/cv/cv-loader'
import { PROFILE_PHOTO, type Profile } from '@/features/profile/profile'
import { homePathFor } from '@/infrastructure/router/navigation'
import { Icon } from '@/presentation/components/icon'
import { Main } from '@/presentation/components/main'
import { Link } from '@/presentation/components/ui/link'
import { TextLink } from '@/presentation/components/ui/text-link'
import { VisuallyHidden } from '@/presentation/components/ui/visually-hidden'
import { useIndexedPageTitle } from '@/presentation/head/use-document-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { apiErrorKey } from '@/presentation/i18n/translation'
import { MissingPiece } from '@/presentation/missing-piece'
import { RouteFallback } from '@/presentation/route-fallback'

import './cv-page.sass'

type CvSheetProps = {
  cv: Cv
  profile: Profile
}

const CvSheet: React.FC<CvSheetProps> = ({ cv, profile }) => {
  const { locale, translate } = useI18n()
  const present = translate('cv.present')
  const contacts = [
    { href: `mailto:${cv.contact.email}`, label: cv.contact.email },
    {
      href: `tel:${cv.contact.phone}`,
      label: formatPhone(cv.contact.phone, locale)
    },
    { href: cv.contact.website, label: displayUrl(cv.contact.website) },
    { href: profile.links.github, label: displayUrl(profile.links.github) },
    { href: profile.links.linkedin, label: displayUrl(profile.links.linkedin) }
  ]

  return (
    <article className='cv-sheet'>
      <header className='cv-cover'>
        <div className='cv-identity'>
          <h1 className='cv-name'>{profile.name}</h1>
          <p className='cv-role'>
            {cv.title}
            <span className='cv-headline'>{cv.headline}</span>
          </p>
        </div>
        <img
          alt={translate('cv.photo')}
          className='cv-photo'
          height={PROFILE_PHOTO.size}
          src={PROFILE_PHOTO.path}
          width={PROFILE_PHOTO.size}
        />
      </header>

      <div className='cv-band'>
        <p className='cv-summary'>{cv.summary}</p>
        <div className='cv-downloads'>
          <Link
            download
            href={cvPdfPath({ isPlain: false, locale })}
            variant='accent'
          >
            <Icon className='token-icon' name='download' />
            {translate('cv.download')}
          </Link>
          <Link download href={cvPdfPath({ isPlain: true, locale })}>
            <Icon className='token-icon' name='download' />
            {translate('cv.downloadPlain')}
          </Link>
          <p className='cv-downloads-note'>{translate('cv.plainNote')}</p>
        </div>
      </div>

      <section aria-labelledby='cv-specs' className='cv-specs'>
        <VisuallyHidden elementType='h2' id='cv-specs'>
          {translate('cv.sections.specs')}
        </VisuallyHidden>
        <dl className='cv-spec-list'>
          {cv.specs.map((spec) => (
            <div className='cv-spec' key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className='cv-body'>
        <div className='cv-main'>
          <section aria-labelledby='cv-experience' className='cv-section'>
            <h2 className='cv-heading' id='cv-experience'>
              {translate('cv.sections.experience')}
            </h2>
            {cv.jobs.map((job) => (
              <div className='cv-job' key={job.employer}>
                <div className='cv-entry-head'>
                  <h3 className='cv-job-title'>
                    {job.title}
                    <span className='cv-employer'>
                      {job.employer}, {job.place}
                    </span>
                  </h3>
                  <p className='cv-period'>
                    {formatPeriod({ locale, period: job.period, present })}
                  </p>
                </div>
                <ul className='cv-missions'>
                  {job.missions.map((mission) => (
                    <li className='cv-mission' key={mission.title}>
                      <div className='cv-entry-head'>
                        <h4 className='cv-mission-title'>{mission.title}</h4>
                        {mission.period !== undefined && (
                          <p className='cv-period'>
                            {formatPeriod({
                              locale,
                              period: mission.period,
                              present
                            })}
                          </p>
                        )}
                      </div>
                      <p>{mission.summary}</p>
                      {mission.points.length > 0 && (
                        <ul className='cv-points'>
                          {mission.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
                <ul className='cv-points cv-job-points'>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section aria-labelledby='cv-projects' className='cv-section'>
            <h2 className='cv-heading' id='cv-projects'>
              {translate('cv.sections.projects')}
            </h2>
            <ul className='cv-projects'>
              {cv.projects.map((project) => (
                <li key={project.name}>
                  <div className='cv-entry-head'>
                    <h3 className='cv-mission-title'>
                      <TextLink href={project.link} target='_blank'>
                        {project.name}
                      </TextLink>
                    </h3>
                    <p className='cv-period'>{project.year}</p>
                  </div>
                  <p>{project.summary}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby='cv-education' className='cv-section'>
            <h2 className='cv-heading' id='cv-education'>
              {translate('cv.sections.education')}
            </h2>
            {cv.education.map((entry) => (
              <p className='cv-education' key={entry.school}>
                <strong>{entry.title}</strong>
                <span>
                  {entry.school}, {entry.year}
                </span>
                <span>{entry.detail}</span>
              </p>
            ))}
          </section>
        </div>

        <div className='cv-aside'>
          <section aria-labelledby='cv-contact' className='cv-section'>
            <h2 className='cv-heading' id='cv-contact'>
              {translate('cv.sections.contact')}
            </h2>
            <ul className='cv-contact'>
              <li>{cv.contact.location}</li>
              {contacts.map((contact) => (
                <li key={contact.href}>
                  <TextLink href={contact.href}>{contact.label}</TextLink>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby='cv-skills' className='cv-section'>
            <h2 className='cv-heading' id='cv-skills'>
              {translate('cv.sections.skills')}
            </h2>
            <dl className='cv-skills'>
              {cv.skills.map((skill) => (
                <div key={skill.group}>
                  <dt>{skill.group}</dt>
                  <dd>{skill.terms.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby='cv-extras' className='cv-section'>
            <h2 className='cv-heading' id='cv-extras'>
              {translate('cv.sections.extras')}
            </h2>
            <ul className='cv-extras'>
              {cv.extras.map((extra) => (
                <li key={extra}>{extra}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  )
}

const CvContent: React.FC = () => {
  const { locale, translate } = useI18n()
  const data = useCvData()
  const cv = use(data.cv)
  const profile = use(data.profile)

  if (cv.status === 'success' && profile.status === 'success') {
    return <CvSheet cv={cv.data} profile={profile.data} />
  }

  const error = cv.status === 'failure' ? cv.error : 'invalid_content'

  return (
    <MissingPiece
      backHref={homePathFor(locale)}
      backLabel={translate('notFound.backHome')}
      message={translate(apiErrorKey(error))}
    />
  )
}

export const CvPage: React.FC = () => {
  useIndexedPageTitle('cv')

  return (
    <Main className='cv-page'>
      <Suspense fallback={<RouteFallback />}>
        <CvContent />
      </Suspense>
    </Main>
  )
}
