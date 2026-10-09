import type React from 'react'

import type { CodeSample } from '@/features/projects/project'

import { CodeSpecimen } from './code-specimen'

type SpecimenListProps = {
  /** Where a specimen's title leads, if anywhere. */
  hrefFor?: (sample: CodeSample) => string | undefined
  samples: readonly CodeSample[]
}

/** Excerpts one under the other, each with what it proves beside it. */
export const SpecimenList: React.FC<SpecimenListProps> = ({
  hrefFor,
  samples
}) => (
  <ol className='specimens'>
    {samples.map((sample) => (
      <li className='specimen' key={sample.title}>
        <CodeSpecimen
          excerpt={sample.excerpt}
          href={hrefFor?.(sample)}
          title={sample.title}
        />
        {sample.notes.length > 0 && (
          <div className='specimen-notes'>
            {sample.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        )}
      </li>
    ))}
  </ol>
)
