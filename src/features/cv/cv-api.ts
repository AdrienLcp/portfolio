import { Result } from '@adrienlcp/result'

import { type Cv, cvSchema, localizeCv } from '@/features/cv/cv'
import { CV } from '@/features/cv/cv-content'
import { type ApiError, serveContent } from '@/infrastructure/api/portfolio-api'
import type { Locale } from '@/presentation/i18n/locale'

export const fetchCv = async ({
  locale,
  signal
}: {
  locale: Locale
  signal: AbortSignal
}): Promise<Result<Cv, ApiError>> => {
  const cv = await serveContent({ content: CV, schema: cvSchema, signal })

  return cv.status === 'failure'
    ? cv
    : Result.success(localizeCv(cv.data, locale))
}
