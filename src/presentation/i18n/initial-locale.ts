import { preferredLocales, servedPath } from '@/infrastructure/browser'
import { localeInPath } from '@/infrastructure/router/navigation'
import {
  readStoredLocale,
  writeStoredLocale
} from '@/infrastructure/storage/preferences-storage'

import { i18n } from './i18n'
import type { Locale } from './locale'

/**
 * The URL first, because it is the only source somebody else can have chosen:
 * a link shared in French opens in French. Then this device's last choice, then
 * the browser. Stamped on `<html lang>` before the first render, or a browser
 * sniffing English markup over French text offers to translate the page.
 */
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
