import { isLocale, type Locale } from '@/presentation/i18n/locale'

const LOCALE_KEY = 'portfolio:locale'

/**
 * `null` means never chosen, which is not the default: the caller then follows
 * the browser. Every access is guarded because `localStorage` throws in a
 * Safari private window.
 */
export const readStoredLocale = (): Locale | null => {
  const stored = read(LOCALE_KEY)

  return stored !== null && isLocale(stored) ? stored : null
}

export const writeStoredLocale = (locale: Locale): void => {
  write(LOCALE_KEY, locale)
}

const read = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

const write = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value)
  } catch {
    return
  }
}
