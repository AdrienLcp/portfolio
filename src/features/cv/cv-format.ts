import type { Period } from '@/features/cv/cv'
import type { Locale } from '@/presentation/i18n/locale'

const formatMonth = (month: string, locale: Locale): string =>
  month.length === 4
    ? month
    : new Intl.DateTimeFormat(locale, {
        month: 'long',
        timeZone: 'UTC',
        year: 'numeric'
      }).format(new Date(`${month}-01T00:00:00Z`))

export const formatPeriod = ({
  locale,
  period,
  present
}: {
  locale: Locale
  period: Period
  present: string
}): string =>
  `${formatMonth(period.from, locale)} – ${period.to === undefined ? present : formatMonth(period.to, locale)}`

/** A French reader dials the national form; anyone else needs the country code. */
export const formatPhone = (phone: string, locale: Locale): string => {
  const digits = phone.replace(/^\+33/, '')
  const pairs = digits.slice(1).match(/\d{2}/g)?.join(' ') ?? ''

  return locale === 'fr'
    ? `0${digits[0]} ${pairs}`
    : `+33 ${digits[0]} ${pairs}`
}

/** A URL as printed on paper: what someone would type, nothing more. */
export const displayUrl = (url: string): string =>
  url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

export const cvPdfPath = ({
  isPlain,
  locale
}: {
  isPlain: boolean
  locale: Locale
}): string => `/cv/adrien-lacourpaille-cv${isPlain ? '-ats' : ''}-${locale}.pdf`
