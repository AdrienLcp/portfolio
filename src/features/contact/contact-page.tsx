import type React from 'react'
import { Suspense, use, useEffect, useRef, useState } from 'react'

import { useContactData } from '@/features/contact/contact-loader'
import type { Profile } from '@/features/profile/profile'
import { copyText, selectContents } from '@/infrastructure/browser'
import { cvPathFor, homePathFor } from '@/infrastructure/router/navigation'
import { BlankEntry } from '@/presentation/blank-entry'
import { Icon } from '@/presentation/components/icon'
import { Main } from '@/presentation/components/main'
import { RegisterButton } from '@/presentation/components/register/register-button'
import { RegisterLink } from '@/presentation/components/register/register-link'
import { RubberStamp } from '@/presentation/components/register/rubber-stamp'
import { IndexedPageTitle } from '@/presentation/head/indexed-page-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { apiErrorKey } from '@/presentation/i18n/translation'
import { RouteFallback } from '@/presentation/route-fallback'

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

/** The address is the page: printed as large as the sheet allows. */
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
        <a href={`mailto:${email}`} ref={addressRef}>
          {mailbox}@<wbr />
          {domain}
        </a>
      </p>
      <div className='contact-act'>
        <div className='contact-actions'>
          <RegisterLink href={`mailto:${email}`} icon='mail' variant='ink'>
            {translate('contact.write')}
          </RegisterLink>
          <RegisterButton
            icon='copy'
            onPress={() => void copyAddress()}
            variant='line'
          >
            {translate('contact.copy')}
          </RegisterButton>
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
        <p>
          <b>{translate('contact.standing.role')}</b>{' '}
          {translate('contact.standing.lookingBefore')}{' '}
          <RegisterLink href={cvPathFor(locale)}>
            {translate('contact.standing.cv')}
          </RegisterLink>{' '}
          {translate('contact.standing.lookingAfter')}
        </p>
        <RubberStamp
          isFresh
          label={translate('home.head.openToWork')}
          note={translate('home.head.place')}
          size='large'
        />
      </div>
    </section>
  )
}

type ElsewhereProps = {
  links: Profile['links']
}

const Elsewhere: React.FC<ElsewhereProps> = ({ links }) => {
  const { locale, translate } = useI18n()
  const rows = [
    {
      href: links.github,
      label: translate('common.github'),
      line: handleOf(links.github),
      note: translate('contact.elsewhere.github'),
      target: '_blank'
    },
    {
      href: links.linkedin,
      label: translate('common.linkedin'),
      line: handleOf(links.linkedin),
      note: translate('contact.elsewhere.linkedin'),
      target: '_blank'
    },
    {
      href: cvPathFor(locale),
      label: translate('header.cv'),
      line: translate('contact.elsewhere.cv'),
      note: translate('contact.elsewhere.cvNote'),
      target: undefined
    }
  ]

  return (
    <section aria-labelledby='elsewhere-title' className='contact-elsewhere'>
      <h2 className='section-label' id='elsewhere-title'>
        {translate('contact.elsewhere.title')}
      </h2>
      <ul className='contact-ledger'>
        {rows.map((row) => (
          <li key={row.href}>
            <RegisterLink href={row.href} target={row.target}>
              <span className='ledger-label'>{row.label}</span>
              <span className='ledger-line'>
                {row.line}
                <small>{row.note}</small>
              </span>
              {row.target === undefined && (
                <Icon className='register-link-icon' name='forward' />
              )}
            </RegisterLink>
          </li>
        ))}
      </ul>
    </section>
  )
}

const ContactCase: React.FC = () => {
  const { locale, translate } = useI18n()
  const { cv: cvRequest, profile: profileRequest } = useContactData()
  const cv = use(cvRequest)
  const profile = use(profileRequest)

  if (cv.status === 'failure' || profile.status === 'failure') {
    const error =
      cv.status === 'failure'
        ? cv.error
        : profile.status === 'failure'
          ? profile.error
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
      <Address email={cv.data.contact.email} />
      <NoteForm />
      <Elsewhere links={profile.data.links} />
    </>
  )
}

export const ContactPage: React.FC = () => {
  return (
    <Main className='contact-page'>
      <IndexedPageTitle page='contact' />
      <Suspense fallback={<RouteFallback />}>
        <ContactCase />
      </Suspense>
    </Main>
  )
}
