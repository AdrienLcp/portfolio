import { isLocale, type Locale } from '@/presentation/i18n/locale'
import { isTheme, type Theme } from '@/presentation/theme/theme'

const LOCALE_KEY = 'portfolio:locale'
/** Read again, raw, by the pre-paint script in `index.html`. */
const THEME_KEY = 'portfolio:theme'

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

/** `null` means the system theme, which the stylesheet resolves on its own. */
export const readStoredTheme = (): Theme | null => {
  const stored = read(THEME_KEY)

  return stored !== null && isTheme(stored) ? stored : null
}

export const writeStoredTheme = (theme: Theme | null): void => {
  if (theme === null) {
    remove(THEME_KEY)
    return
  }

  write(THEME_KEY, theme)
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

const remove = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch {
    return
  }
}
