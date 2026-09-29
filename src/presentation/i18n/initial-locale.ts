import { preferredLocales, servedPath } from '@/infrastructure/browser'
import { localeInPath } from '@/infrastructure/router/navigation'
import {
  readStoredLocale,
  writeStoredLocale
} from '@/infrastructure/storage/preferences-storage'

import { i18n } from './i18n'
import type { Locale } from './locale'

export const applyInitialLocale = (): Locale => {
  const inUrl = localeInPath(servedPath())
  const locale =
    inUrl ?? readStoredLocale() ?? i18n.negotiate(preferredLocales())

  if (inUrl !== null) {
    writeStoredLocale(inUrl)
  }

  document.documentElement.lang = locale

  return locale
}
