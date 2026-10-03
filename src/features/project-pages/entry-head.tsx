import type React from 'react'

import { Unfolds } from '@/features/register/unfolds'
import { RegisterLink } from '@/presentation/components/register/register-link'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

/** A date printed in the head's first column, over what it marks. */
export type HeadDate = {
  label: string
  value: string
}

type EntryHeadProps = {
  /** The links the entry is for: the live app, the source. */
  actions: React.ReactNode
  /** Below the text on a narrow screen, beside it on a wide one. */
  children?: React.ReactNode
  dates: readonly HeadDate[]
  /** Leads back to the entry's row on the home page. */
  registerHref: string
  kind: string
  name: string
  /** The entry's slug, which its register row unfolds under. */
  slug: string
  stack: readonly string[]
  stamp: React.ReactNode
  summary: string
  tagline: string
  titleId: string
}

/** The entry's own head: dated, named, stamped, and what it is built with. */
export const EntryHead: React.FC<EntryHeadProps> = ({
  actions,
  children,
  dates,
  kind,
  name,
  registerHref,
  slug,
  stack,
  stamp,
  summary,
  tagline,
  titleId
}) => {
  const translate = useTranslate()

  return (
    <header className='entry-head'>
      <RegisterLink
        className='entry-crumb'
        href={registerHref}
        icon='back'
        variant='caps'
      >
        {translate('project.breadcrumb')}
      </RegisterLink>
      <div className='entry-head-grid'>
        <Unfolds part='dates' slug={slug}>
          <dl className='entry-head-dates'>
            {dates.map((date) => (
              <div key={date.label}>
                <dt>{date.label}</dt>
                <dd>{date.value}</dd>
              </div>
            ))}
          </dl>
        </Unfolds>
        <div className='entry-head-text'>
          <Unfolds part='name' slug={slug}>
            <h1 className='entry-title' id={titleId}>
              {name}
            </h1>
          </Unfolds>
          <p className='entry-kind'>{kind}</p>
          <p className='entry-head-tagline'>{tagline}</p>
          <p className='entry-head-summary'>{summary}</p>
          <ul aria-label={translate('project.stack')} className='stack-line'>
            {stack.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          <div className='entry-head-actions'>{actions}</div>
        </div>
        <div className='entry-head-stamp'>{stamp}</div>
      </div>
      {children}
    </header>
  )
}
