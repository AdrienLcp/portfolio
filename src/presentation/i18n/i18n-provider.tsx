import type React from 'react'
import { useEffect, useState } from 'react'

import { createSafeContext } from '@/helpers/contexts'
import { writeStoredLocale } from '@/infrastructure/storage/preferences-storage'
import { I18nProvider as ReactAriaI18nProvider } from '@/presentation/components/i18n-provider'

import { i18n } from './i18n'
import type { Locale } from './locale'
import type { Translate } from './translation'

/** Must match the `optimizeLocales` list in `vite.config.ts`. */
const REACT_ARIA_LOCALES: Record<Locale, string> = {
  en: 'en-US',
  fr: 'fr-FR'
}

type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  translate: Translate
}

export const [I18nContext, useI18n] =
  createSafeContext<I18nContextValue>('I18nProvider')

export const useTranslate = (): Translate => useI18n().translate

type I18nProviderProps = {
  children: React.ReactNode
  /** Already stamped on `<html lang>` by `applyInitialLocale`. */
  locale: Locale
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  locale: initialLocale
}) => {
  const [locale, setLocale] = useState<Locale>(initialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const chooseLocale = (next: Locale): void => {
    setLocale(next)
    writeStoredLocale(next)
  }

  return (
    <I18nContext
      value={{
        locale,
        setLocale: chooseLocale,
        translate: i18n.translator(locale)
      }}
    >
      <ReactAriaI18nProvider locale={REACT_ARIA_LOCALES[locale]}>
        {children}
      </ReactAriaI18nProvider>
    </I18nContext>
  )
}
