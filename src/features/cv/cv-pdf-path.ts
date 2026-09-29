import type { Locale } from '@/presentation/i18n/locale'

export const cvPdfPath = ({
  isPlain,
  locale
}: {
  isPlain: boolean
  locale: Locale
}): string => `/cv/adrien-lacourpaille-cv${isPlain ? '-ats' : ''}-${locale}.pdf`
