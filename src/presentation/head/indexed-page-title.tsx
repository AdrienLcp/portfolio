import type React from 'react'

import { type IndexedPage, PAGE_HEADS } from '@/presentation/head/document-head'
import { DocumentTitle } from '@/presentation/head/document-title'
import { useI18n } from '@/presentation/i18n/i18n-provider'

/**
 * The page's `<title>`, which React moves into the head: the prerender reads it
 * out of each document's markup, and in the app it follows navigations and
 * language switches. One per screen, rendered by the page itself.
 */
export const IndexedPageTitle: React.FC<{ page: IndexedPage }> = ({ page }) => {
  const { locale } = useI18n()

  return <DocumentTitle>{PAGE_HEADS[locale][page].title}</DocumentTitle>
}
