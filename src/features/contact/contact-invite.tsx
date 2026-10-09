import type React from 'react'

import { cvPdfPath } from '@/features/cv/cv-pdf-path'
import { contactPathFor } from '@/infrastructure/router/navigation'
import { SiteLink } from '@/presentation/components/site-link/site-link'
import { useI18n } from '@/presentation/i18n/i18n-provider'

import './contact-invite.sass'

/** The close of a page: an invitation to write, and both CVs to take. */
export const ContactInvite: React.FC = () => {
  const { locale, translate } = useI18n()

  return (
    <section aria-labelledby='invite-title' className='contact-invite'>
      <div className='invite-card'>
        <h2 className='invite-title' id='invite-title'>
          {translate('invite.titleBefore')}{' '}
          <span>{translate('invite.titleAccent')}</span>
        </h2>
        <p className='invite-note'>{translate('invite.note')}</p>
        <div className='invite-actions'>
          <SiteLink href={contactPathFor(locale)} icon='mail' variant='ink'>
            {translate('invite.write')}
          </SiteLink>
          <SiteLink
            download
            href={cvPdfPath({ isPlain: false, locale })}
            icon='file'
            variant='line'
          >
            {translate('invite.cvPdf')}
          </SiteLink>
          <SiteLink
            download
            href={cvPdfPath({ isPlain: true, locale })}
            icon='file'
            variant='line'
          >
            {translate('invite.cvAts')}
          </SiteLink>
        </div>
      </div>
    </section>
  )
}
