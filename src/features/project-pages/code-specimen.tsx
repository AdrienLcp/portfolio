import type React from 'react'
import { useId } from 'react'

import type {
  HighlightedExcerpt,
  HighlightedLine,
  Token
} from '@/features/projects/code-excerpt'
import { Icon } from '@/presentation/components/icon'
import { SiteLink } from '@/presentation/components/site-link/site-link'
import { VisuallyHidden } from '@/presentation/components/ui/visually-hidden'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import { useOverflowsSideways } from './use-overflows-sideways'

const Tokens: React.FC<{ tokens: readonly Token[] }> = ({ tokens }) =>
  tokens.map((token) =>
    token.kind === 'plain' ? (
      token.text
    ) : (
      <span className={`token-${token.kind}`} key={token.start}>
        {token.text}
      </span>
    )
  )

/**
 * A refused line is underlined from its first character, past the indent, the
 * way an editor draws a squiggle under the expression it cannot accept.
 */
const CodeLine: React.FC<{ line: HighlightedLine }> = ({ line }) => {
  const translate = useTranslate()
  const { indent } = line
  const isRefused = line.refusals.length > 0

  return (
    <>
      <span className={isRefused ? 'code-line refused' : 'code-line'}>
        {indent}
        {isRefused ? (
          <span className='squiggle'>
            <Tokens tokens={line.tokens} />
          </span>
        ) : (
          <Tokens tokens={line.tokens} />
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
  excerpt: HighlightedExcerpt
  /** Leads to the row of the package the excerpt is taken from. */
  href?: string
  title: string
}

/**
 * An excerpt set the way an editor shows it, under a verdict that says whether
 * the compiler takes it.
 */
export const CodeSpecimen: React.FC<CodeSpecimenProps> = ({
  excerpt: { lines, refusalCount },
  href,
  title
}) => {
  const translate = useTranslate()
  const titleId = useId()
  const { attach: attachScroller, overflows: scrollerOverflows } =
    useOverflowsSideways<HTMLElement>()
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
          {href === undefined ? (
            title
          ) : (
            <SiteLink href={href}>{title}</SiteLink>
          )}
        </figcaption>
        <span
          aria-label={translate('project.verdict.label', { errors, verdict })}
          className={refusalCount === 0 ? 'verdict' : 'verdict refused'}
          role='img'
        >
          <b>{verdict}</b>
          <span>{errors}</span>
        </span>
      </div>
      {/* A named region, in the Tab order while the excerpt overflows, so a keyboard can scroll it sideways in every browser. */}
      <section
        aria-label={translate('project.code', { title })}
        className='specimen-scroll'
        ref={attachScroller}
        tabIndex={scrollerOverflows ? 0 : undefined}
      >
        <pre className='specimen-code' lang='en'>
          <code>
            {lines.map((line) => (
              <CodeLine key={line.sourceLine} line={line} />
            ))}
          </code>
        </pre>
      </section>
    </figure>
  )
}
