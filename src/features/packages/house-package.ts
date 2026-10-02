import { z } from 'zod'

import { localizedTextSchema } from '@/features/content/localized-text'
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

export const housePackageNameSchema = z.enum(HOUSE_PACKAGE_NAMES)

export type HousePackageName = z.infer<typeof housePackageNameSchema>

export const HOUSE_PACKAGE_SCOPE = '@adrienlcp/'

const housePackageSchema = z.strictObject({
  /** What the package does, in one line a recruiter can read. */
  job: localizedTextSchema,
  name: housePackageNameSchema,
  released: z.iso.date(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/)
})

const hasUniqueNames = (packages: readonly HousePackageContent[]): boolean =>
  new Set(packages.map((housePackage) => housePackage.name)).size ===
  packages.length

export const housePackagesSchema = z
  .array(housePackageSchema)
  .min(1)
  .refine(hasUniqueNames, { message: 'Two packages share a name' })

type HousePackageContent = z.infer<typeof housePackageSchema>

export type HousePackage = Omit<HousePackageContent, 'job'> & { job: string }

export const localizeHousePackage = (
  housePackage: HousePackageContent,
  locale: Locale
): HousePackage => ({ ...housePackage, job: housePackage.job[locale] })

export const scopedNameOf = (name: HousePackageName): string =>
  `${HOUSE_PACKAGE_SCOPE}${name}`
