import type React from 'react'
import { useId, useRef, useState } from 'react'
import { Button } from 'react-aria-components'

import {
  HOUSE_PACKAGE_NAMES,
  type HousePackageName
} from '@/features/packages/house-package'
import type { Project, RegisterEntry } from '@/features/projects/project'
import { projectPathFor } from '@/infrastructure/router/navigation'
import { Icon } from '@/presentation/components/icon'
import { RegisterLink } from '@/presentation/components/register/register-link'
import { useI18n } from '@/presentation/i18n/i18n-provider'
import type { Translate } from '@/presentation/i18n/translation'

import { appsReference, packageReference } from './cross-reference'
import {
  AnalyticsDrawing,
  AnalyticsMechanism
} from './drawings/analytics-drawings'
import {
  OnRecordDrawing,
  OnRecordMechanism
} from './drawings/on-record-drawings'
import { SeanceDrawing, SeanceMechanism } from './drawings/seance-drawings'
import { TaverlaDrawing, TaverlaMechanism } from './drawings/taverla-drawings'
import { ReleaseStamp } from './release-stamp'
import { useDrawnWhenSeen } from './use-drawn-when-seen'

type Plates = {
  Drawing: React.FC
  Mechanism: React.FC
  mechanismTitle: (translate: Translate) => string
}

/** The drawings made for each app's row, by slug. */
const PLATES: Record<string, Plates> = {
  analytics: {
    Drawing: AnalyticsDrawing,
    Mechanism: AnalyticsMechanism,
    mechanismTitle: (translate) => translate('home.mechanisms.analytics')
  },
  'on-record': {
    Drawing: OnRecordDrawing,
    Mechanism: OnRecordMechanism,
    mechanismTitle: (translate) => translate('home.mechanisms.onRecord')
  },
  seance: {
    Drawing: SeanceDrawing,
    Mechanism: SeanceMechanism,
    mechanismTitle: (translate) => translate('home.mechanisms.seance')
  },
  taverla: {
    Drawing: TaverlaDrawing,
    Mechanism: TaverlaMechanism,
    mechanismTitle: (translate) => translate('home.mechanisms.taverla')
  }
}

/** Another row of the register this one points at. */
export type RowReference = {
  name: string
  slug: string
}

type InstallsProps = {
  installs: readonly HousePackageName[]
  /** The package a reader points at, lit wherever it is installed. */
  litPackage: HousePackageName | null
}

const InstallsLine: React.FC<{ installs: readonly HousePackageName[] }> = ({
  installs
}) => {
  const { translate } = useI18n()
  const total = HOUSE_PACKAGE_NAMES.length
  const missing = HOUSE_PACKAGE_NAMES.filter((name) => !installs.includes(name))
  const [onlyMissing] = missing

  const count =
    missing.length === 0
      ? translate('home.entry.installsAll', { total: String(total) })
      : missing.length === 1 && onlyMissing !== undefined
        ? translate('home.entry.installsAllBut', {
            count: String(installs.length),
            missing: onlyMissing
          })
        : translate('home.entry.installsSome', {
            count: String(installs.length)
          })

  return (
    <p className='entry-label'>
      {translate('home.entry.installs')} · {count}
    </p>
  )
}

/** Each chip leads down to its package's row, and lights it on the way. */
export const Installs: React.FC<InstallsProps> = ({ installs, litPackage }) => (
  <div className='installs'>
    <InstallsLine installs={installs} />
    <ul className='chips'>
      {installs.map((name) => (
        <li key={name}>
          <a
            {...packageReference(name)}
            className={name === litPackage ? 'chip lit' : 'chip'}
            href={`#package-${name}`}
          >
            {name}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

type ReportsLineProps = {
  label: string
  references: readonly RowReference[]
  slug: string
}

/** Ties a row to the rows it sends page views to, or receives them from. */
export const ReportsLine: React.FC<ReportsLineProps> = ({
  label,
  references,
  slug
}) => (
  <p className='reports-line'>
    <span className='entry-label'>{label}</span>
    {references.map((reference) => (
      <a
        {...appsReference([reference.slug, slug])}
        className='chip app-chip'
        href={`#${reference.slug}`}
        key={reference.slug}
      >
        {reference.name}
        <Icon className='chip-icon' name='newTab' />
      </a>
    ))}
  </p>
)

type EnteredDateProps = {
  date: string
  label: string
}

export const EnteredDate: React.FC<EnteredDateProps> = ({ date, label }) => (
  <p className='entry-date'>
    <time dateTime={date}>{date}</time>
    <small>{label}</small>
  </p>
)

type AppEntryProps = {
  /** The analytics row this app reports to, if any. */
  countedBy: RowReference | null
  /** Pressed as the page loads: the newest entry of the register. */
  isFresh: boolean
  isLit: boolean
  litPackage: HousePackageName | null
  project: Project & { register: RegisterEntry }
  /** The rows that send their page views to this one. */
  reporters: readonly RowReference[]
}

/** One app's row: dated, drawn, stamped, and unfolding into what shipped. */
export const AppEntry: React.FC<AppEntryProps> = ({
  countedBy,
  isFresh,
  isLit,
  litPackage,
  project,
  reporters
}) => {
  const { locale, translate } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const drawerId = useId()
  const titleId = useId()
  const mechanismRef = useRef<HTMLDivElement>(null)
  const isDrawn = useDrawnWhenSeen(mechanismRef, isOpen)
  const { register, slug } = project
  const plates = PLATES[slug]

  return (
    <li
      className={isLit ? 'register-row app-row lit' : 'register-row app-row'}
      id={slug}
    >
      <article aria-labelledby={titleId} className='app-entry'>
        <EnteredDate
          date={register.entered}
          label={translate('home.entry.entered')}
        />
        <div className='entry-text'>
          <p className='entry-kind'>
            {translate('home.register.app')} · {register.category}
          </p>
          <h2 className='entry-name' id={titleId}>
            {project.name}
          </h2>
          <p className='entry-tagline'>{project.tagline}</p>
          <p className='entry-summary'>{project.summary}</p>
          <Installs installs={register.installs} litPackage={litPackage} />
          {countedBy !== null && (
            <ReportsLine
              label={translate('home.entry.pageViewsTo')}
              references={[countedBy]}
              slug={slug}
            />
          )}
          {reporters.length > 0 && (
            <ReportsLine
              label={translate('home.entry.countsFrom')}
              references={reporters}
              slug={slug}
            />
          )}
          <div className='entry-actions'>
            <Button
              aria-controls={drawerId}
              aria-expanded={isOpen}
              className='open-entry'
              onPress={() => setIsOpen((wasOpen) => !wasOpen)}
            >
              <Icon className='open-entry-icon' name='plus' />
              {translate(isOpen ? 'home.entry.close' : 'home.entry.open')}
            </Button>
            <RegisterLink
              href={projectPathFor({ locale, slug })}
              variant='caps'
            >
              {translate('home.entry.full')}
            </RegisterLink>
            {project.links.live !== undefined && (
              <RegisterLink
                href={project.links.live}
                target='_blank'
                variant='caps'
              >
                {translate(
                  project.kind === 'game'
                    ? 'home.entry.openGame'
                    : 'home.entry.openApp'
                )}
              </RegisterLink>
            )}
          </div>
        </div>
        {plates !== undefined && (
          <figure className='entry-figure'>
            <plates.Drawing />
            <figcaption>{translate('home.entry.drawn')}</figcaption>
          </figure>
        )}
        <div className='entry-state'>
          <ReleaseStamp
            entered={register.entered}
            isFresh={isFresh}
            state={register.state}
          />
        </div>
      </article>
      <div
        className={isOpen ? 'entry-drawer open' : 'entry-drawer'}
        id={drawerId}
        inert={!isOpen}
      >
        <div className='drawer-clip'>
          <div className='drawer-body'>
            <div className='drawer-text'>
              <h3 className='drawer-title'>
                {translate('home.entry.shipped')}
              </h3>
              <ol className='shipped-list'>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ol>
              <div className='entry-actions'>
                <RegisterLink
                  href={project.links.repository}
                  target='_blank'
                  variant='caps'
                >
                  {translate('home.entry.source')}
                </RegisterLink>
              </div>
            </div>
            {plates !== undefined && (
              <div
                className={
                  isDrawn ? 'drawer-mechanism drawn' : 'drawer-mechanism'
                }
                ref={mechanismRef}
              >
                <h3 className='drawer-title'>
                  {translate('home.entry.mechanism')} ·{' '}
                  {plates.mechanismTitle(translate)}
                </h3>
                <plates.Mechanism />
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}
