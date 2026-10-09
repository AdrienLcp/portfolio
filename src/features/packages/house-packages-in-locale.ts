import type { Locale } from '@/presentation/i18n/locale'

import { type HousePackage, localizeHousePackage } from './house-package'
import { HOUSE_PACKAGES } from './house-packages-content'

export const housePackagesIn = (locale: Locale): HousePackage[] =>
  HOUSE_PACKAGES.map((housePackage) =>
    localizeHousePackage(housePackage, locale)
  )
