import type React from 'react'

import {
  HOUSE_PACKAGE_SCOPE,
  type HousePackage,
  type HousePackageName
} from '@/features/packages/house-package'
import { RegisterLink } from '@/presentation/components/register/register-link'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import { EntryBlock } from './entry-block'

/** Where a package's row lives, on the packages entry. */
export type PackageRowHref = (name: HousePackageName) => string

type EntryInstallsProps = {
  housePackages: readonly HousePackage[]
  installs: readonly HousePackageName[]
  /** Where each package's row lives, on the packages entry. */
  packageRowHref: PackageRowHref | null
}

/** The house packages the app installs, each at the version npm serves. */
export const EntryInstalls: React.FC<EntryInstallsProps> = ({
  housePackages,
  installs,
  packageRowHref
}) => {
  const translate = useTranslate()
  const installed = housePackages.filter((housePackage) =>
    installs.includes(housePackage.name)
  )

  return (
    <EntryBlock
      lead={translate('project.installsLead', {
        count: String(installed.length),
        total: String(housePackages.length)
      })}
      title={translate('project.installs')}
    >
      <ul className='install-lines'>
        {installed.map(({ job, name, version }) => (
          <li key={name}>
            <span className='install-name'>
              {packageRowHref === null ? (
                <>
                  <span className='scope'>{HOUSE_PACKAGE_SCOPE}</span>
                  {name}
                </>
              ) : (
                <RegisterLink href={packageRowHref(name)}>
                  <span className='scope'>{HOUSE_PACKAGE_SCOPE}</span>
                  {name}
                </RegisterLink>
              )}
            </span>
            <span className='install-job'>{job}</span>
            <span className='install-version'>{version}</span>
          </li>
        ))}
      </ul>
    </EntryBlock>
  )
}
