import type React from 'react'

import { useTranslate } from '@/presentation/i18n/i18n-provider'

export type DetailFigure = {
  label: string
  /** Where the value comes from, or what it counts. */
  note?: string
  value: string
}

/** The project's figures, read across in one quiet row. */
export const DetailFigures: React.FC<{ figures: readonly DetailFigure[] }> = ({
  figures
}) => {
  const translate = useTranslate()

  return (
    <section
      aria-label={translate('project.figures')}
      className='detail-figures'
    >
      <dl>
        {figures.map((figure) => (
          <div className='figure' key={figure.label}>
            <dt>{figure.label}</dt>
            <dd className='figure-value'>{figure.value}</dd>
            {figure.note !== undefined && (
              <dd className='figure-note'>{figure.note}</dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  )
}
