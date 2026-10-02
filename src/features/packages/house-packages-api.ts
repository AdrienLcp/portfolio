import { Result } from '@adrienlcp/result'

import {
  type HousePackage,
  housePackagesSchema,
  localizeHousePackage
} from '@/features/packages/house-package'
import { HOUSE_PACKAGES } from '@/features/packages/house-packages-content'
import { type ApiError, serveContent } from '@/infrastructure/api/portfolio-api'
import type { Locale } from '@/presentation/i18n/locale'

export const fetchHousePackages = async (
  locale: Locale
): Promise<Result<HousePackage[], ApiError>> => {
  const housePackages = await serveContent(housePackagesSchema, HOUSE_PACKAGES)

  return housePackages.status === 'failure'
    ? housePackages
    : Result.success(
        housePackages.data.map((housePackage) =>
          localizeHousePackage(housePackage, locale)
        )
      )
}
