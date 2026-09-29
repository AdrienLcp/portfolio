import { Result } from '@adrienlcp/result'

import {
  type About,
  aboutSchema,
  localizeAbout
} from '@/features/about/domain/about'
import { ABOUT } from '@/features/about/domain/about-content'
import { type ApiError, serveContent } from '@/infrastructure/api/portfolio-api'
import type { Locale } from '@/presentation/i18n/locale'

export const fetchAbout = async (
  locale: Locale
): Promise<Result<About, ApiError>> => {
  const about = await serveContent(aboutSchema, ABOUT)

  return about.status === 'failure'
    ? about
    : Result.success(localizeAbout(about.data, locale))
}
