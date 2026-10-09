const REFUSAL_MARK = '// ✗ '
const RESULT_MARK = '// → '

/** A line of code, with what the compiler answers about it. */
export type FoldedLine = {
  /** Each message the compiler refuses the line with. */
  refusals: string[]
  /** What the compiler infers for the line, or what the line produces. */
  results: string[]
  /** Where the line sits in the source, from 1: what tells two lines apart. */
  sourceLine: number
  text: string
}

/** The few kinds of token the site's code colours tell apart. */
export type TokenKind =
  | 'call'
  | 'comment'
  | 'keyword'
  | 'plain'
  | 'string'
  | 'type'

export type Token = {
  kind: TokenKind
  /** The column the token starts at, past the indent: what tells two tokens apart. */
  start: number
  text: string
}

/** A folded line, split into coloured tokens after its indent. */
export type HighlightedLine = Omit<FoldedLine, 'text'> & {
  indent: string
  tokens: Token[]
}

/**
 * An excerpt set the way an editor shows it, highlighted at build time by the
 * `highlightedExcerpts` Vite plugin, so no tokenizer ships to the browser.
 */
export type HighlightedExcerpt = {
  lines: HighlightedLine[]
  refusalCount: number
}

const annotationOf = (line: string, mark: string): string | null => {
  const trimmed = line.trimStart()

  return trimmed.startsWith(mark) ? trimmed.slice(mark.length) : null
}

/** Folds the `// ✗` and `// →` lines into the code line above them. */
export const foldedLinesOf = (code: string): FoldedLine[] => {
  const lines: FoldedLine[] = []

  for (const [index, text] of code.split('\n').entries()) {
    const refusal = annotationOf(text, REFUSAL_MARK)
    const result = annotationOf(text, RESULT_MARK)
    const previous = lines.at(-1)

    if (previous !== undefined && refusal !== null) {
      previous.refusals.push(refusal)
    } else if (previous !== undefined && result !== null) {
      previous.results.push(result)
    } else {
      lines.push({ refusals: [], results: [], sourceLine: index + 1, text })
    }
  }

  return lines
}
