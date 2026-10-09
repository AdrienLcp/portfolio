import type React from 'react'

import {
  HOUSE_PACKAGE_SCOPE,
  type HousePackage,
  type HousePackageName
} from '@/features/packages/house-package'
import { SiteLink } from '@/presentation/components/site-link/site-link'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import { DetailSection } from './detail-section'

/** Where a package's row lives, on the packages page. */
export type PackageRowHref = (name: HousePackageName) => string

/** A house package's name, its scope set back. */
export const ScopedName: React.FC<{ name: HousePackageName }> = ({ name }) => (
  <>
    <span className='scope'>{HOUSE_PACKAGE_SCOPE}</span>
    {name}
  </>
)

type InstalledPackagesProps = {
  housePackages: readonly HousePackage[]
  installs: readonly HousePackageName[]
  packageRowHref: PackageRowHref | null
}

/** The house packages the app installs, each at the version npm serves. */
export const InstalledPackages: React.FC<InstalledPackagesProps> = ({
  housePackages,
  installs,
  packageRowHref
}) => {
  const translate = useTranslate()
  const installed = housePackages.filter((housePackage) =>
    installs.includes(housePackage.name)
  )

  return (
    <DetailSection
      lead={translate('project.installsLead', {
        count: String(installed.length),
        total: String(housePackages.length)
      })}
      title={translate('project.installs')}
    >
      <ul className='package-lines'>
        {installed.map(({ job, name, version }) => (
          <li key={name}>
            <span className='package-name'>
              {packageRowHref === null ? (
                <ScopedName name={name} />
              ) : (
                <SiteLink href={packageRowHref(name)}>
                  <ScopedName name={name} />
                </SiteLink>
              )}
            </span>
            <span className='package-job'>{job}</span>
            <span className='package-version'>{version}</span>
          </li>
        ))}
      </ul>
    </DetailSection>
  )
}
