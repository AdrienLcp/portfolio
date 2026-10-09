import type React from 'react'

import {
  type HousePackage,
  type HousePackageName,
  scopedNameOf
} from '@/features/packages/house-package'
import { npmPageFor } from '@/features/projects/project'
import { SiteLink } from '@/presentation/components/site-link/site-link'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import { ScopedName } from './installed-packages'

/** A project that installs house packages: an app, or this site. */
export type PackageUser = {
  installs: readonly HousePackageName[]
  name: string
}

/** The anchor a package's row answers to, from the excerpts and the installed packages. */
export const packageRowIdOf = (name: HousePackageName): string =>
  `package-${name}`

type UsedByProps = {
  name: HousePackageName
  users: readonly PackageUser[]
}

/** Who installs the package, said in the fewest words. */
const UsedBy: React.FC<UsedByProps> = ({ name, users }) => {
  const translate = useTranslate()
  const installers = users.filter((user) => user.installs.includes(name))
  const others = users.filter((user) => !user.installs.includes(name))
  const [onlyOther] = others

  return (
    <span className='package-users'>
      {others.length === 0
        ? translate('project.packages.usedByAll')
        : others.length === 1 && onlyOther !== undefined
          ? translate('project.packages.usedByAllBut', {
              missing: onlyOther.name
            })
          : installers.map((user) => user.name).join(', ')}
    </span>
  )
}

type PackageTableProps = {
  housePackages: readonly HousePackage[]
  users: readonly PackageUser[]
}

/** Every house package: what it does, its version on npm, and who installs it. */
export const PackageTable: React.FC<PackageTableProps> = ({
  housePackages,
  users
}) => {
  const translate = useTranslate()

  return (
    <ul className='package-lines package-table'>
      {housePackages.map(({ job, name, version }) => (
        <li id={packageRowIdOf(name)} key={name}>
          <h3 className='package-name'>
            <SiteLink href={npmPageFor(scopedNameOf(name))} target='_blank'>
              <ScopedName name={name} />
            </SiteLink>
          </h3>
          <span className='package-job'>{job}</span>
          <span className='package-version'>{version}</span>
          <span className='package-used'>
            <span className='package-used-label'>
              {translate('project.packages.usedBy')}
            </span>{' '}
            <UsedBy name={name} users={users} />
          </span>
        </li>
      ))}
    </ul>
  )
}
