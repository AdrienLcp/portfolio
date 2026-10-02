import {
  HOUSE_PACKAGE_NAMES,
  type HousePackageName
} from '@/features/packages/house-package'
import type { Project, RegisterEntry } from '@/features/projects/project'

import type { LedgerColumn } from './package-ledger'

/** The day this site's repository was opened. */
export const SITE_OPENED = '2026-09-24'

/** The slug the site's own row answers to, as an anchor and a reference. */
export const SITE_SLUG = 'this-site'

/** Every house package, down to the compiler and linter settings. */
export const SITE_INSTALLS: readonly HousePackageName[] = HOUSE_PACKAGE_NAMES

export type RegisteredProject = Project & { register: RegisterEntry }

export const isRegistered = (project: Project): project is RegisteredProject =>
  project.register !== undefined

/** One ledger column per app, in the register's order, then this site. */
export const ledgerColumnsOf = ({
  apps,
  siteName,
  siteShortName
}: {
  apps: readonly RegisteredProject[]
  siteName: string
  siteShortName: string
}): LedgerColumn[] => [
  ...apps.map((app) => ({
    installs: app.register.installs,
    name: app.name,
    shortName: app.register.shortName,
    slug: app.slug
  })),
  {
    installs: SITE_INSTALLS,
    name: siteName,
    shortName: siteShortName,
    slug: SITE_SLUG
  }
]
