import type React from 'react'

import { contactPathFor, cvPathFor } from '@/infrastructure/router/navigation'
import { RegisterLink } from '@/presentation/components/register/register-link'
import { useI18n } from '@/presentation/i18n/i18n-provider'

type RegisterHeadProps = {
  appCount: number
  firstEntry: string | null
  lastEntry: string | null
  packageCount: number
}

/** The first viewport: who keeps the register, and what is in it. */
export const RegisterHead: React.FC<RegisterHeadProps> = ({
  appCount,
  firstEntry,
  lastEntry,
  packageCount
}) => {
  const { locale, translate } = useI18n()

  return (
    <section aria-labelledby='register-keeper' className='register-head'>
      <div className='head-rule'>
        <p className='head-role'>
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
            <span>{translate('home.head.openToWork')}</span>
          </span>
        </p>
        <p className='head-ledger'>
          {firstEntry !== null && (
            <span>
              {translate('home.head.keptSince')}{' '}
              <time dateTime={firstEntry}>{firstEntry}</time>
            </span>
          )}
          {lastEntry !== null && (
            <span>
              {translate('home.head.lastEntry')}{' '}
              <time dateTime={lastEntry}>{lastEntry}</time>
            </span>
          )}
          <span>
            <b>{appCount}</b> {translate('home.head.released')} · <b>1</b>{' '}
            {translate('home.head.inProgress')} · <b>{packageCount}</b>{' '}
            {translate('home.head.packages')}
          </span>
        </p>
      </div>
      <h1 className='head-name' id='register-keeper'>
        {translate('home.title')}
      </h1>
      <div className='head-aside'>
        <p className='head-lead'>
          {translate('home.head.lead')}{' '}
          <span>{translate('home.head.leadSoft')}</span>{' '}
          {translate('home.head.leadAfter')}
        </p>
        <div className='head-actions'>
          <RegisterLink href={contactPathFor(locale)} icon='mail' variant='ink'>
            {translate('header.contact')}
          </RegisterLink>
          <RegisterLink href={cvPathFor(locale)} icon='download' variant='line'>
            {translate('header.cv')}
          </RegisterLink>
        </div>
      </div>
    </section>
  )
}
