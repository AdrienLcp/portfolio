import type { Coverage } from '@/features/projects/project'
import type { Translate } from '@/presentation/i18n/translation'

import type { EntryFact } from './entry-facts'

export const coverageFact = (
  coverage: Coverage,
  translate: Translate
): EntryFact => ({
  label: translate('project.coverage'),
  note: translate('project.coverageNote', {
    date: coverage.readOn,
    scope: coverage.scope
  }),
  value: translate('project.coverageValue', {
    percent: String(Math.round(coverage.lines))
  })
})
