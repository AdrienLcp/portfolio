import type { Coverage } from '@/features/projects/project'
import type { Locale } from '@/presentation/i18n/locale'
import type { Translate } from '@/presentation/i18n/translation'

import type { DetailFigure } from './detail-figures'

/** "14 March 2025": a calendar day read in the page's language. */
export const dayOf = (isoDate: string, locale: Locale): string =>
  Temporal.PlainDate.from(isoDate).toLocaleString(locale, {
    dateStyle: 'long'
  })

export const coverageFigure = (
  coverage: Coverage,
  translate: Translate
): DetailFigure => ({
  label: translate('project.coverage'),
  note: translate('project.coverageNote', {
    date: coverage.readOn,
    scope: coverage.scope
  }),
  value: translate('project.coverageValue', {
    percent: String(Math.round(coverage.lines))
  })
})
