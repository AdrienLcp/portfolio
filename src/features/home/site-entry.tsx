import type React from 'react'
import { useId } from 'react'

import {
  HOUSE_PACKAGE_NAMES,
  type HousePackageName
} from '@/features/packages/house-package'
import { useTranslate } from '@/presentation/i18n/i18n-provider'
import { LOCALES } from '@/presentation/i18n/locale'

import {
  EnteredDate,
  Installs,
  ReportsLine,
  type RowReference
} from './app-entry'

/** The day this site's repository was opened. */
export const SITE_OPENED = '2026-09-24'

/** The slug the site's own row answers to, as an anchor and a reference. */
export const SITE_SLUG = 'this-site'

/** Every house package, down to the compiler and linter settings. */
export const SITE_INSTALLS: readonly HousePackageName[] = HOUSE_PACKAGE_NAMES

type SiteEntryProps = {
  countedBy: RowReference | null
  isLit: boolean
  litPackage: HousePackageName | null
}

/** A small flag on a pole: work still going on. */
const InProgressFlag: React.FC = () => {
  const translate = useTranslate()

  return (
    <span
      aria-label={translate('home.state.inProgress')}
      className='in-progress-flag'
      role='img'
    >
      <svg aria-hidden='true' focusable='false' viewBox='0 0 30 38'>
        <path d='M3 2v34' stroke='var(--ink)' strokeWidth='2' />
        <path d='M4 3h22l-5 7 5 7H4z' fill='var(--violet)' />
        <path d='M4 17h8l-8 5z' fill='var(--ink)' opacity='0.55' />
      </svg>
      {translate('home.state.inProgress')}
    </span>
  )
}

/** The register's open entry: the site being read, still in progress. */
export const SiteEntry: React.FC<SiteEntryProps> = ({
  countedBy,
  isLit,
  litPackage
}) => {
  const translate = useTranslate()
  const titleId = useId()

  return (
    <li
      className={
        isLit
          ? 'register-row app-row site-row lit'
          : 'register-row app-row site-row'
      }
      id={SITE_SLUG}
    >
      <article aria-labelledby={titleId} className='app-entry'>
        <EnteredDate date={SITE_OPENED} label={translate('home.site.opened')} />
        <div className='entry-text'>
          <p className='entry-kind'>{translate('home.site.category')}</p>
          <h2 className='entry-name' id={titleId}>
            {translate('home.site.name')}
          </h2>
          <p className='entry-summary'>{translate('home.site.summary')}</p>
          <Installs installs={SITE_INSTALLS} litPackage={litPackage} />
          {countedBy !== null && (
            <ReportsLine
              label={translate('home.entry.pageViewsTo')}
              references={[countedBy]}
              slug={SITE_SLUG}
            />
          )}
        </div>
        <dl className='site-measures'>
          <div>
            <dt>{translate('home.site.lighthouse')}</dt>
            <dd>{translate('home.site.lighthouseValue')}</dd>
          </div>
          <div>
            <dt>{translate('home.site.locales')}</dt>
            <dd>{LOCALES.join(' · ')}</dd>
          </div>
          <div>
            <dt>{translate('home.site.hosting')}</dt>
            <dd>{translate('home.site.hostingValue')}</dd>
          </div>
        </dl>
        <div className='entry-state'>
          <InProgressFlag />
        </div>
      </article>
    </li>
  )
}
