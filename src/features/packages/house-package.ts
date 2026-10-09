import type { LocalizedText } from '@/features/content/localized-text'
import type { Locale } from '@/presentation/i18n/locale'

/** Every package published under `@adrienlcp/`, by its name without the scope. */
export const HOUSE_PACKAGE_NAMES = [
  'biome-config',
  'browser',
  'i18n',
  'react',
  'react-aria',
  'react-router',
  'result',
  'safe-storage',
  'styles',
  'theme-preference',
  'tsconfig'
] as const

export type HousePackageName = (typeof HOUSE_PACKAGE_NAMES)[number]

export const HOUSE_PACKAGE_SCOPE = '@adrienlcp/'

export type HousePackageContent = {
  /** What the package does, in one line a recruiter can read. */
  job: LocalizedText
  name: HousePackageName
  /** An ISO date, `YYYY-MM-DD`. */
  released: string
  /** `major.minor.patch`. */
  version: string
}

export type HousePackage = Omit<HousePackageContent, 'job'> & { job: string }

export const localizeHousePackage = (
  housePackage: HousePackageContent,
  locale: Locale
): HousePackage => ({ ...housePackage, job: housePackage.job[locale] })

export const scopedNameOf = (name: HousePackageName): string =>
  `${HOUSE_PACKAGE_SCOPE}${name}`
