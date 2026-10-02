import type React from 'react'

import {
  HOUSE_PACKAGE_SCOPE,
  type HousePackage,
  type HousePackageName,
  scopedNameOf
} from '@/features/packages/house-package'
import { npmPageFor } from '@/features/projects/project'
import { Icon } from '@/presentation/components/icon'
import { RegisterLink } from '@/presentation/components/register/register-link'
import { VisuallyHidden } from '@/presentation/components/ui/visually-hidden'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import { packageReference } from './cross-reference'
import { ReleaseStamp } from './release-stamp'

/** One column of the package matrix: an app and what it installs. */
export type LedgerColumn = {
  installs: readonly HousePackageName[]
  name: string
  shortName: string
  slug: string
}

type UsedByProps = {
  columns: readonly LedgerColumn[]
  name: HousePackageName
}

/** The matrix read aloud, for the narrow screen that has no room for it. */
const UsedBy: React.FC<UsedByProps> = ({ columns, name }) => {
  const translate = useTranslate()
  const users = columns.filter((column) => column.installs.includes(name))
  const nonUsers = columns.filter((column) => !column.installs.includes(name))
  const [onlyNonUser] = nonUsers

  return (
    <span aria-hidden='true' className='used-text'>
      {nonUsers.length === 0
        ? translate('home.packages.usedByAll', { count: String(users.length) })
        : nonUsers.length === 1 && onlyNonUser !== undefined
          ? translate('home.packages.usedByAllBut', {
              missing: onlyNonUser.name
            })
          : users.map((user) => user.name).join(', ')}
    </span>
  )
}

type PackageRowProps = {
  columns: readonly LedgerColumn[]
  housePackage: HousePackage
  isLit: boolean
}

const PackageRow: React.FC<PackageRowProps> = ({
  columns,
  housePackage,
  isLit
}) => {
  const translate = useTranslate()
  const { job, name, released, version } = housePackage

  return (
    <li
      {...packageReference(name)}
      className={
        isLit ? 'register-row package-row lit' : 'register-row package-row'
      }
      id={`package-${name}`}
    >
      <div className='package-entry ledger-columns'>
        <time className='package-date' dateTime={released}>
          {released}
        </time>
        <h3 className='package-name'>
          <RegisterLink href={npmPageFor(scopedNameOf(name))} target='_blank'>
            <mark>
              <span className='scope'>{HOUSE_PACKAGE_SCOPE}</span>
              {name}
            </mark>
          </RegisterLink>
        </h3>
        <p className='package-job'>{job}</p>
        <span className='package-version'>{version}</span>
        {columns.map((column) =>
          column.installs.includes(name) ? (
            <span className='tick' key={column.slug}>
              <Icon className='tick-icon' name='check' />
              <VisuallyHidden elementType='span'>
                {translate('home.packages.used', { app: column.name })}
              </VisuallyHidden>
            </span>
          ) : (
            <span className='tick' key={column.slug}>
              <span aria-hidden='true' className='tick-none'>
                —
              </span>
              <VisuallyHidden elementType='span'>
                {translate('home.packages.unused', { app: column.name })}
              </VisuallyHidden>
            </span>
          )
        )}
        <UsedBy columns={columns} name={name} />
        <span className='package-state'>
          <ReleaseStamp size='small' state='shipped' />
        </span>
      </div>
    </li>
  )
}

type PackageLedgerProps = {
  columns: readonly LedgerColumn[]
  housePackages: readonly HousePackage[]
  litPackage: HousePackageName | null
  /** The packages' own page, when its project exists. */
  packagesPath: string | null
  repository: string | null
}

/** The ledger's anchor, for the rows that install every package. */
export const PACKAGE_LEDGER_ID = 'packages'

/** The packages every app installs, one row each, with who uses which. */
export const PackageLedger: React.FC<PackageLedgerProps> = ({
  columns,
  housePackages,
  litPackage,
  packagesPath,
  repository
}) => {
  const translate = useTranslate()
  const [first] = housePackages

  return (
    <li
      className='package-block'
      id={PACKAGE_LEDGER_ID}
      style={{ '--app-columns': columns.length }}
    >
      <div className='package-cap'>
        <span className='cap-title'>
          {first !== undefined && `${first.released} · `}
          {translate('home.packages.cap', {
            count: String(housePackages.length)
          })}
        </span>
        <span className='cap-links'>
          {packagesPath !== null && (
            <RegisterLink href={packagesPath}>
              <span className='cap-link-label'>
                {translate('home.packages.open')}
              </span>
            </RegisterLink>
          )}
          {repository !== null && (
            <RegisterLink href={repository} target='_blank'>
              <span className='cap-link-label'>
                {repository.replace('https://', '')}
              </span>
            </RegisterLink>
          )}
        </span>
      </div>
      <div aria-hidden='true' className='ledger-head'>
        <div className='ledger-columns wide-head'>
          <span>{translate('home.register.date')}</span>
          <span>{translate('home.packages.package')}</span>
          <span />
          <span>{translate('home.packages.version')}</span>
          {columns.map((column) => (
            <span className='column-app' key={column.slug} title={column.name}>
              {column.shortName}
            </span>
          ))}
          <span className='column-state'>
            {translate('home.register.state')}
          </span>
        </div>
        <div className='narrow-head'>
          <span>
            {translate('home.packages.package')} ·{' '}
            {translate('home.packages.usedBy')}
          </span>
          <span>
            {translate('home.packages.version')} ·{' '}
            {translate('home.register.state')}
          </span>
        </div>
      </div>
      <ol className='package-rows'>
        {housePackages.map((housePackage) => (
          <PackageRow
            columns={columns}
            housePackage={housePackage}
            isLit={litPackage === housePackage.name}
            key={housePackage.name}
          />
        ))}
      </ol>
    </li>
  )
}
