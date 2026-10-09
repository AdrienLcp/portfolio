import type React from 'react'
import { useEffect, useRef, useState } from 'react'

import { useContactData } from '@/features/contact/contact-loader'
import type { Profile } from '@/features/profile/profile'
import { copyText, selectContents } from '@/infrastructure/browser'
import { cvPathFor } from '@/infrastructure/router/navigation'
import { Icon, type IconName } from '@/presentation/components/icon'
import { Main } from '@/presentation/components/main'
import { SiteButton } from '@/presentation/components/site-link/site-button'
import { SiteLink } from '@/presentation/components/site-link/site-link'
import { IndexedPageTitle } from '@/presentation/head/indexed-page-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'

import { NoteForm } from './note-form'

import './contact-page.sass'

const COPY_STATUS_MS = 3200

type CopyStatus = 'copied' | 'failed' | 'idle'

/** The last segment of a profile URL: the handle someone would search for. */
const handleOf = (url: string): string =>
  new URL(url).pathname.split('/').filter(Boolean).at(-1) ?? url

type AddressProps = {
  email: string
}

/** The address is the page: set as large as the sheet allows. */
const Address: React.FC<AddressProps> = ({ email }) => {
  const { locale, translate } = useI18n()
  const addressRef = useRef<HTMLAnchorElement>(null)
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')
  const [mailbox, domain] = email.split('@')

  useEffect(() => {
    if (copyStatus === 'idle') {
      return
    }

    const timer = window.setTimeout(() => setCopyStatus('idle'), COPY_STATUS_MS)

    return () => window.clearTimeout(timer)
  }, [copyStatus])

  const copyAddress = async (): Promise<void> => {
    const copied = await copyText(email)

    if (copied.status === 'failure' && addressRef.current !== null) {
      selectContents(addressRef.current)
    }

    setCopyStatus(copied.status === 'success' ? 'copied' : 'failed')
  }

  return (
    <section aria-labelledby='contact-title' className='contact-hero'>
      <h1 className='contact-lead' id='contact-title'>
        {translate('contact.lead')}
      </h1>
      <p className='contact-address'>
        <SiteLink href={`mailto:${email}`} ref={addressRef}>
          {mailbox}@<wbr />
          {domain}
        </SiteLink>
      </p>
      <div className='contact-act'>
        <div className='contact-actions'>
          <SiteLink href={`mailto:${email}`} icon='mail' variant='ink'>
            {translate('contact.write')}
          </SiteLink>
          <SiteButton
            icon='copy'
            onPress={() => void copyAddress()}
            variant='line'
          >
            {translate('contact.copy')}
          </SiteButton>
        </div>
        <p className='copy-status' role='status'>
          {copyStatus === 'copied' && (
            <>
              <Icon className='copy-status-icon' name='check' />
              {translate('contact.copied')}
            </>
          )}
          {copyStatus === 'failed' && translate('contact.copyFailed')}
        </p>
      </div>
      <div className='contact-standing'>
        <p className='contact-open'>
          <span aria-hidden='true' className='contact-open-dot' />
          {translate('home.hero.openToWork')}
        </p>
        <p>
          <b>{translate('contact.standing.role')}</b>{' '}
          {translate('contact.standing.lookingBefore')}{' '}
          <SiteLink href={cvPathFor(locale)}>
            {translate('contact.standing.cv')}
          </SiteLink>{' '}
          {translate('contact.standing.lookingAfter')}
        </p>
      </div>
    </section>
  )
}

type ElsewhereRow = {
  href: string
  icon: IconName
  label: string
  line: string
  note: string
  target: '_blank' | undefined
}

type ElsewhereProps = {
  links: Profile['links']
}

const Elsewhere: React.FC<ElsewhereProps> = ({ links }) => {
  const { locale, translate } = useI18n()
  const rows: ElsewhereRow[] = [
    {
      href: links.github,
      icon: 'github',
      label: translate('common.github'),
      line: handleOf(links.github),
      note: translate('contact.elsewhere.github'),
      target: '_blank'
    },
    {
      href: links.linkedin,
      icon: 'linkedin',
      label: translate('common.linkedin'),
      line: handleOf(links.linkedin),
      note: translate('contact.elsewhere.linkedin'),
      target: '_blank'
    },
    {
      href: cvPathFor(locale),
      icon: 'file',
      label: translate('header.cv'),
      line: translate('contact.elsewhere.cv'),
      note: translate('contact.elsewhere.cvNote'),
      target: undefined
    }
  ]

  return (
    <section aria-labelledby='elsewhere-title' className='contact-elsewhere'>
      <h2 className='contact-section-title' id='elsewhere-title'>
        {translate('contact.elsewhere.title')}
      </h2>
      <ul className='elsewhere-list'>
        {rows.map((row) => (
          <li key={row.href}>
            <SiteLink
              className='elsewhere-link'
              href={row.href}
              target={row.target}
            >
              <span className='elsewhere-label'>
                <Icon className='elsewhere-mark' name={row.icon} />
                {row.label}
              </span>
              <span className='elsewhere-line'>
                {row.line}
                <small>{row.note}</small>
              </span>
              {row.target === undefined && (
                <Icon className='site-link-icon' name='forward' />
              )}
            </SiteLink>
          </li>
        ))}
      </ul>
    </section>
  )
}

export const ContactPage: React.FC = () => {
  const { cv, profile } = useContactData()

  return (
    <Main className='contact-page'>
      <IndexedPageTitle page='contact' />
      <Address email={cv.contact.email} />
      <NoteForm />
      <Elsewhere links={profile.links} />
    </Main>
  )
}
