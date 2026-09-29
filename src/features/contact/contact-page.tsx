import { copyText, selectContents } from '@adrienlcp/browser'
import type React from 'react'
import { Suspense, use, useRef } from 'react'

import { useContactData } from '@/features/contact/contact-loader'
import { cvPathFor } from '@/infrastructure/router/navigation'
import { Icon } from '@/presentation/components/icon'
import { Lid } from '@/presentation/components/lid'
import { Main } from '@/presentation/components/main'
import { Button } from '@/presentation/components/ui/button'
import { Link } from '@/presentation/components/ui/link'
import { showToast } from '@/presentation/components/ui/toast'
import { VisuallyHidden } from '@/presentation/components/ui/visually-hidden'
import { useIndexedPageTitle } from '@/presentation/head/use-document-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import { apiErrorKey } from '@/presentation/i18n/translation'

import { ReplyCard } from './reply-card'

import './contact-page.sass'

/** The address printed as large as the lid allows, the reply card under it. */
const Mailbox: React.FC = () => {
  const { locale, translate } = useI18n()
  const { cv, profile } = useContactData()
  const cvResult = use(cv)
  const profileResult = use(profile)
  const addressRef = useRef<HTMLParagraphElement>(null)

  if (cvResult.status === 'failure') {
    return (
      <p className='contact-failure'>
        {translate(apiErrorKey(cvResult.error))}
      </p>
    )
  }

  if (profileResult.status === 'failure') {
    return (
      <p className='contact-failure'>
        {translate(apiErrorKey(profileResult.error))}
      </p>
    )
  }

  const { email } = cvResult.data.contact
  const { links } = profileResult.data

  const copyAddress = async (): Promise<void> => {
    const copied = await copyText(email)

    if (copied.status === 'success') {
      showToast(translate('contact.copied'))
    } else if (addressRef.current !== null) {
      selectContents(addressRef.current)
    }
  }

  return (
    <>
      <section aria-labelledby='contact-mail' className='mail-slot'>
        <VisuallyHidden elementType='h2' id='contact-mail'>
          {translate('cv.email')}
        </VisuallyHidden>
        <p className='contact-address' ref={addressRef}>
          {email}
        </p>
        <div className='contact-actions'>
          <Link href={`mailto:${email}`} variant='accent'>
            {translate('contact.write')}
            <Icon className='token-icon' name='mail' />
          </Link>
          <Button icon='copy' onPress={() => void copyAddress()}>
            {translate('contact.copy')}
          </Button>
        </div>
      </section>
      <ReplyCard />
      <section aria-labelledby='contact-elsewhere' className='elsewhere'>
        <h2 className='elsewhere-heading' id='contact-elsewhere'>
          {translate('contact.elsewhere')}
        </h2>
        <div className='elsewhere-links'>
          <Link href={links.github} target='_blank'>
            {translate('common.github')}
          </Link>
          <Link href={links.linkedin} target='_blank'>
            {translate('common.linkedin')}
          </Link>
          <Link href={cvPathFor(locale)}>{translate('header.cv')}</Link>
        </div>
      </section>
    </>
  )
}

export const ContactPage: React.FC = () => {
  const { translate } = useI18n()
  useIndexedPageTitle('contact')

  return (
    <Main className='contact-page'>
      <Lid
        band={<p>{translate('contact.lead')}</p>}
        title={translate('contact.title')}
      />
      <div className='contact-sheet'>
        <Suspense fallback={<div aria-busy='true' className='pending' />}>
          <Mailbox />
        </Suspense>
      </div>
    </Main>
  )
}
