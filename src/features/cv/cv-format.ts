import type { Period } from '@/features/cv/cv'
import type { Locale } from '@/presentation/i18n/locale'

/** The two messages a period is written with: the app's `Translate` is one. */
export type PeriodWords = {
  (key: 'cv.present'): string
  (key: 'cv.month', values: { month: Temporal.PlainDate }): string
}

const formatMonth = (month: string, translate: PeriodWords): string =>
  month.length === 4
    ? month
    : translate('cv.month', { month: Temporal.PlainDate.from(`${month}-01`) })

export const formatPeriod = (period: Period, translate: PeriodWords): string =>
  `${formatMonth(period.from, translate)} – ${period.to === undefined ? translate('cv.present') : formatMonth(period.to, translate)}`

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
