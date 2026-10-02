import type React from 'react'

import { cvPdfPath } from '@/features/cv/cv-pdf-path'
import { currentYear } from '@/infrastructure/clock'
import { contactPathFor } from '@/infrastructure/router/navigation'
import { RegisterLink } from '@/presentation/components/register/register-link'
import { useI18n } from '@/presentation/i18n/i18n-provider'

/** The register's last line, left blank for the reader's team to fill. */
export const NextEntry: React.FC = () => {
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
