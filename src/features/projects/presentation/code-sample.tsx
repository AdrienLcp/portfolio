import type React from 'react'

import type { CodeSample } from '@/features/projects/domain/project'

import './code-sample.sass'

const COMMENT_START = '//'
const COMPILE_ERROR_MARK = '✗'

const lineClassFor = (line: string): string | undefined => {
  const trimmed = line.trimStart()
  if (!trimmed.startsWith(COMMENT_START)) {
    return undefined
  }
  return trimmed.includes(COMPILE_ERROR_MARK) ? 'compile-error' : 'comment'
}

type CodeSampleCardProps = {
  sample: CodeSample
}

/**
 * A snippet printed on a card from the box. A comment line marked ✗ is what
 * the compiler answers, and is printed in the active ink.
 */
export const CodeSampleCard: React.FC<CodeSampleCardProps> = ({ sample }) => {
  const lines = sample.code.split('\n')

  return (
    <figure className='code-sample'>
      <figcaption className='sample-title'>{sample.title}</figcaption>
      <pre className='sample-code' lang='en'>
        <code>
          {lines.map((line, index) => (
            <span
              className={lineClassFor(line)}
              // biome-ignore lint/suspicious/noArrayIndexKey: a snippet's lines never reorder
              key={index}
            >
              {index < lines.length - 1 ? `${line}\n` : line}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  )
}
