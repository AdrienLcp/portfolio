import { Result } from '@adrienlcp/result'

import { isLocale, type Locale } from '@/presentation/i18n/locale'
import { isTheme, type Theme } from '@/presentation/theme/theme'

const LOCALE_KEY = 'portfolio:locale'
/** Read again, raw, by the pre-paint script in `index.html`. */
const THEME_KEY = 'portfolio:theme'

/**
 * - `'unavailable'` — `localStorage` threw, as it does in a Safari private window
 * - `'unrecognized'` — the stored value is not one this version of the app knows
 */
export type PreferenceReadError = 'unavailable' | 'unrecognized'

export type PreferenceWriteError = 'unavailable'

/**
 * Succeeds with `null` when no locale was ever chosen, which is not the
 * default: the caller then follows the browser.
 */
export const readStoredLocale = (): Result<
  Locale | null,
  PreferenceReadError
> => readRecognized({ isRecognized: isLocale, key: LOCALE_KEY })

export const writeStoredLocale = (
  locale: Locale
): Result<void, PreferenceWriteError> => write(LOCALE_KEY, locale)

/**
 * Succeeds with `null` for the system theme, which the stylesheet resolves on
 * its own.
 */
export const readStoredTheme = (): Result<Theme | null, PreferenceReadError> =>
  readRecognized({ isRecognized: isTheme, key: THEME_KEY })

export const writeStoredTheme = (
  theme: Theme | null
): Result<void, PreferenceWriteError> =>
  theme === null ? remove(THEME_KEY) : write(THEME_KEY, theme)

const readRecognized = <Value extends string>({
  isRecognized,
  key
}: {
  isRecognized: (stored: string) => stored is Value
  key: string
}): Result<Value | null, PreferenceReadError> => {
  const stored = read(key)

  if (stored.status === 'failure') {
    return stored
  }

  if (stored.data === null) {
    return Result.success(null)
  }

  return isRecognized(stored.data)
    ? Result.success(stored.data)
    : Result.failure('unrecognized')
}

const read = (key: string): Result<string | null, 'unavailable'> => {
  try {
    return Result.success(localStorage.getItem(key))
  } catch {
    return Result.failure('unavailable')
  }
}

const write = (key: string, value: string): Result<void, 'unavailable'> => {
  try {
    localStorage.setItem(key, value)
    return Result.success()
  } catch {
    return Result.failure('unavailable')
  }
}

const remove = (key: string): Result<void, 'unavailable'> => {
  try {
    localStorage.removeItem(key)
    return Result.success()
  } catch {
    return Result.failure('unavailable')
  }
}
