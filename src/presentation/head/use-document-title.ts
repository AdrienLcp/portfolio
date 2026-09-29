import { useEffect } from 'react'

import { type IndexedPage, PAGE_HEADS } from '@/presentation/head/document-head'
import { useI18n } from '@/presentation/i18n/i18n-provider'

export const useDocumentTitle = (title: string): void => {
  useEffect(() => {
    document.title = title
  }, [title])
}

export const useIndexedPageTitle = (page: IndexedPage): void => {
  const { locale } = useI18n()

  useDocumentTitle(PAGE_HEADS[locale][page].title)
}
