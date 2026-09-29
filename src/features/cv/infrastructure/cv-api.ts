import { Result } from '@adrienlcp/result'

import { type Cv, cvSchema, localizeCv } from '@/features/cv/domain/cv'
import { CV } from '@/features/cv/domain/cv-content'
import { type ApiError, serveContent } from '@/infrastructure/api/portfolio-api'
import type { Locale } from '@/presentation/i18n/locale'

export const fetchCv = async (
  locale: Locale
): Promise<Result<Cv, ApiError>> => {
  const cv = await serveContent(cvSchema, CV)

  return cv.status === 'failure'
    ? cv
    : Result.success(localizeCv(cv.data, locale))
}
