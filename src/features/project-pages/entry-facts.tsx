import type React from 'react'

import { useTranslate } from '@/presentation/i18n/i18n-provider'

export type EntryFact = {
  label: string
  /** Where the value comes from, or what it counts. */
  note: string
  value: string
}

/** The entry's figures, read across in one ruled band. */
export const EntryFacts: React.FC<{ facts: readonly EntryFact[] }> = ({
  facts
}) => {
  const translate = useTranslate()

  return (
    <section aria-label={translate('project.facts')} className='entry-facts'>
      <dl style={{ '--fact-count': facts.length }}>
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>
              {fact.value}
              <small>{fact.note}</small>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
