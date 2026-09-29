import { isLocale, type Locale } from '@/presentation/i18n/locale'
import { isTheme, type Theme } from '@/presentation/theme/theme'

const LOCALE_KEY = 'portfolio:locale'
const THEME_KEY = 'portfolio:theme'

export const readStoredLocale = (): Locale | null => {
  const stored = read(LOCALE_KEY)

  return stored !== null && isLocale(stored) ? stored : null
}

export const writeStoredLocale = (locale: Locale): void => {
  write(LOCALE_KEY, locale)
}

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
