import { z } from 'zod/mini'

import { localizedTextSchema } from '@/features/content/content-schemas'
import {
  HOUSE_PACKAGE_NAMES,
  type HousePackageContent
} from '@/features/packages/house-package'

export const housePackageNameSchema = z.enum(HOUSE_PACKAGE_NAMES)

const housePackageSchema = z.strictObject({
  job: localizedTextSchema,
  name: housePackageNameSchema,
  released: z.iso.date(),
  version: z.string().check(z.regex(/^\d+\.\d+\.\d+$/))
}) satisfies z.ZodMiniType<HousePackageContent>

const hasUniqueNames = (packages: readonly HousePackageContent[]): boolean =>
  new Set(packages.map((housePackage) => housePackage.name)).size ===
  packages.length

export const housePackagesSchema = z
  .array(housePackageSchema)
  .check(z.minLength(1))
  .check(z.refine(hasUniqueNames, { message: 'Two packages share a name' }))
