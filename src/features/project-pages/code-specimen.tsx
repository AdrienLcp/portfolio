import type React from 'react'
import { useId } from 'react'

import { Icon } from '@/presentation/components/icon'
import { VisuallyHidden } from '@/presentation/components/ui/visually-hidden'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import {
  type ExcerptLine,
  excerptOf,
  type Token,
  tokensOf
} from './code-excerpt'

const INDENT = /^\s*/

const Tokens: React.FC<{ text: string }> = ({ text }) =>
  tokensOf(text).map((token: Token, index) =>
    token.kind === 'plain' ? (
      token.text
    ) : (
      // biome-ignore lint/suspicious/noArrayIndexKey: a line's tokens never reorder
      <span className={`token-${token.kind}`} key={index}>
        {token.text}
      </span>
    )
  )

/**
 * A refused line is underlined from its first character, past the indent, the
 * way an editor draws a squiggle under the expression it cannot accept.
 */
const CodeLine: React.FC<{ line: ExcerptLine }> = ({ line }) => {
  const translate = useTranslate()
  const indent = INDENT.exec(line.text)?.[0] ?? ''
  const code = line.text.slice(indent.length)
  const isRefused = line.refusals.length > 0

  return (
    <>
      <span className={isRefused ? 'code-line refused' : 'code-line'}>
        {indent}
        {isRefused ? (
          <span className='squiggle'>
            <Tokens text={code} />
          </span>
        ) : (
          <Tokens text={code} />
        )}
        {'\n'}
      </span>
      {line.refusals.map((refusal) => (
        <span className='code-note refusal' key={refusal}>
          {indent}
          <Icon className='code-note-icon' name='refused' />
          <VisuallyHidden elementType='span'>
            {translate('project.refusal')}:{' '}
          </VisuallyHidden>
          {refusal}
          {'\n'}
        </span>
      ))}
      {line.results.map((result) => (
        <span className='code-note result' key={result}>
          {indent}
          <VisuallyHidden elementType='span'>
            {translate('project.result')}:{' '}
          </VisuallyHidden>
          {result}
          {'\n'}
        </span>
      ))}
    </>
  )
}

type CodeSpecimenProps = {
  code: string
  /** Leads to the row of the package the excerpt is taken from. */
  href?: string
  title: string
}

/**
 * An excerpt set the way an editor shows it, under a stamp that says whether
 * the compiler takes it.
 */
export const CodeSpecimen: React.FC<CodeSpecimenProps> = ({
  code,
  href,
  title
}) => {
  const translate = useTranslate()
  const titleId = useId()
  const { lines, refusalCount } = excerptOf(code)
  const verdict = translate(
    refusalCount === 0 ? 'project.verdict.compiles' : 'project.verdict.refused'
  )
  const errors =
    refusalCount === 0
      ? translate('project.verdict.noErrors')
      : refusalCount === 1
        ? translate('project.verdict.oneError')
        : translate('project.verdict.errors', { count: String(refusalCount) })

  return (
    <figure aria-labelledby={titleId} className='code-specimen'>
      <div className='specimen-bar'>
        <figcaption className='specimen-title' id={titleId}>
          {href === undefined ? title : <a href={href}>{title}</a>}
        </figcaption>
        <span
          aria-label={translate('project.verdict.stamp', { errors, verdict })}
          className={
            refusalCount === 0
              ? 'release-stamp small verdict'
              : 'release-stamp small verdict refused'
          }
          role='img'
        >
          <b>{verdict}</b>
          <span>{errors}</span>
        </span>
      </div>
      {/* A region, so a keyboard can reach the excerpt and scroll it sideways. */}
      <section
        aria-label={translate('project.code', { title })}
        className='specimen-scroll'
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrolling region must be reachable from the keyboard
        tabIndex={0}
      >
        <pre className='specimen-code' lang='en'>
          <code>
            {lines.map((line, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: an excerpt's lines never reorder
              <CodeLine key={index} line={line} />
            ))}
          </code>
        </pre>
      </section>
    </figure>
  )
}
