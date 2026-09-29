import { useEffect } from 'react'

import { type IndexedPage, PAGE_HEADS } from '@/presentation/head/document-head'
import { useI18n } from '@/presentation/i18n/i18n-provider'

/**
 * The tab, after an in-app navigation: the served document carries the right
 * title, but a client-side navigation replaces no head at all.
 */
export const useDocumentTitle = (title: string): void => {
  useEffect(() => {
    document.title = title
  }, [title])
}

/** Read from the provider, so switching language on the spot retitles the tab. */
export const useIndexedPageTitle = (page: IndexedPage): void => {
  const { locale } = useI18n()

  useDocumentTitle(PAGE_HEADS[locale][page].title)
}
