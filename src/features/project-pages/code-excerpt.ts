const REFUSAL_MARK = '// ✗ '
const RESULT_MARK = '// → '

/** A line of code, with what the compiler answers about it. */
export type ExcerptLine = {
  /** Each message the compiler refuses the line with. */
  refusals: string[]
  /** What the compiler infers for the line, or what the line produces. */
  results: string[]
  text: string
}

export type Excerpt = {
  lines: ExcerptLine[]
  refusalCount: number
}

const annotationOf = (line: string, mark: string): string | null => {
  const trimmed = line.trimStart()

  return trimmed.startsWith(mark) ? trimmed.slice(mark.length) : null
}

/** Folds the `// ✗` and `// →` lines into the code line above them. */
export const excerptOf = (code: string): Excerpt => {
  const lines: ExcerptLine[] = []

  for (const text of code.split('\n')) {
    const refusal = annotationOf(text, REFUSAL_MARK)
    const result = annotationOf(text, RESULT_MARK)
    const previous = lines.at(-1)

    if (previous !== undefined && refusal !== null) {
      previous.refusals.push(refusal)
    } else if (previous !== undefined && result !== null) {
      previous.results.push(result)
    } else {
      lines.push({ refusals: [], results: [], text })
    }
  }

  return {
    lines,
    refusalCount: lines.reduce((count, line) => count + line.refusals.length, 0)
  }
}

export type TokenKind =
  | 'call'
  | 'comment'
  | 'keyword'
  | 'plain'
  | 'string'
  | 'type'

export type Token = {
  kind: TokenKind
  text: string
}

const TOKEN_PATTERN = new RegExp(
  [
    String.raw`(?<comment>\/\/.*$)`,
    String.raw`(?<string>'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|${'`'}[^${'`'}]*${'`'})`,
    String.raw`(?<keyword>\b(?:as|async|await|const|else|export|false|from|if|import|let|new|null|return|true|type|undefined)\b)`,
    String.raw`(?<call>\b[A-Za-z_$][\w$]*(?=\())`,
    String.raw`(?<type>\b(?:boolean|number|string|void|[A-Z][\w$]*)\b)`
  ].join('|'),
  'g'
)

const KINDS = ['comment', 'string', 'keyword', 'call', 'type'] as const

/** Splits a line of TypeScript into the few kinds an editor colours. */
export const tokensOf = (line: string): Token[] => {
  const tokens: Token[] = []
  let cursor = 0

  for (const match of line.matchAll(TOKEN_PATTERN)) {
    const kind = KINDS.find(
      (candidate) => match.groups?.[candidate] !== undefined
    )

    if (kind === undefined) {
      continue
    }

    if (match.index > cursor) {
      tokens.push({ kind: 'plain', text: line.slice(cursor, match.index) })
    }

    tokens.push({ kind, text: match[0] })
    cursor = match.index + match[0].length
  }

  if (cursor < line.length) {
    tokens.push({ kind: 'plain', text: line.slice(cursor) })
  }

  return tokens
}
