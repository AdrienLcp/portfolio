import { createHighlighterCore, type ThemeRegistration } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import typescript from 'shiki/langs/typescript.mjs'

import {
  foldedLinesOf,
  type HighlightedExcerpt,
  type HighlightedLine,
  type Token,
  type TokenKind
} from '../src/features/projects/code-excerpt.ts'

/**
 * A theme's colours must be hex, so each kind gets a placeholder colour of its
 * own and the tokens are read back as kinds; the site's stylesheet paints them.
 */
const PLACEHOLDER_COLOR_OF_KIND = {
  call: '#000001',
  comment: '#000002',
  keyword: '#000003',
  plain: '#000000',
  string: '#000004',
  type: '#000005'
} as const satisfies Record<TokenKind, string>

const KINDS: readonly TokenKind[] = [
  'call',
  'comment',
  'keyword',
  'plain',
  'string',
  'type'
]

const KIND_OF_PLACEHOLDER_COLOR = new Map<string, TokenKind>(
  KINDS.map((kind) => [PLACEHOLDER_COLOR_OF_KIND[kind], kind])
)

const THEME_NAME = 'portfolio-excerpt'

const theme: ThemeRegistration = {
  name: THEME_NAME,
  settings: [
    { settings: { foreground: PLACEHOLDER_COLOR_OF_KIND.plain } },
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: PLACEHOLDER_COLOR_OF_KIND.comment }
    },
    {
      scope: ['string', 'punctuation.definition.string'],
      settings: { foreground: PLACEHOLDER_COLOR_OF_KIND.string }
    },
    {
      scope: [
        'keyword',
        'storage.type',
        'storage.modifier',
        'constant.language',
        'keyword.operator.new',
        'keyword.operator.expression'
      ],
      settings: { foreground: PLACEHOLDER_COLOR_OF_KIND.keyword }
    },
    {
      scope: ['keyword.operator', 'storage.type.function.arrow'],
      settings: { foreground: PLACEHOLDER_COLOR_OF_KIND.plain }
    },
    {
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: PLACEHOLDER_COLOR_OF_KIND.call }
    },
    {
      scope: ['entity.name.type', 'support.type', 'support.class'],
      settings: { foreground: PLACEHOLDER_COLOR_OF_KIND.type }
    }
  ],
  type: 'light'
}

const LEADING_WHITESPACE = /^\s*/

/**
 * Shiki gives up on a line after 500 ms and leaves the rest of it plain, which a
 * busy build or test run reaches; the excerpts are short and built once.
 */
const NO_TOKENIZE_TIME_LIMIT = 0

const kindOf = (color: string | undefined): TokenKind =>
  KIND_OF_PLACEHOLDER_COLOR.get(color?.toLowerCase() ?? '') ?? 'plain'

type ThemedText = Omit<Token, 'start'>

/** Drops the indent off the front of the tokens and merges same-kind neighbours. */
const tokensAfter = (
  indent: string,
  tokens: readonly ThemedText[]
): Token[] => {
  const merged: Token[] = []
  let toSkip = indent.length
  let column = 0

  for (const token of tokens) {
    const text = token.text.slice(toSkip)

    toSkip = Math.max(0, toSkip - token.text.length)

    if (text === '') {
      continue
    }

    const previous = merged.at(-1)

    if (previous?.kind === token.kind) {
      previous.text += text
    } else {
      merged.push({ kind: token.kind, start: column, text })
    }
    column += text.length
  }

  return merged
}

/** Colours an excerpt: folds its annotations, then tokenizes it as TypeScript. */
export type ExcerptHighlighter = (code: string) => HighlightedExcerpt

/**
 * Loads the TypeScript grammar once; every excerpt the returned function
 * colours reuses it.
 */
export const createExcerptHighlighter =
  async (): Promise<ExcerptHighlighter> => {
    const highlighter = await createHighlighterCore({
      engine: createJavaScriptRegexEngine(),
      langs: [typescript],
      themes: [theme]
    })

    return (code) => {
      const folded = foldedLinesOf(code)
      const tokenLines = highlighter.codeToTokensBase(
        folded.map((line) => line.text).join('\n'),
        {
          lang: 'typescript',
          theme: THEME_NAME,
          tokenizeTimeLimit: NO_TOKENIZE_TIME_LIMIT
        }
      )
      const lines = folded.map(({ text, ...line }, index): HighlightedLine => {
        const indent = LEADING_WHITESPACE.exec(text)?.[0] ?? ''
        const tokens = (tokenLines[index] ?? []).map(
          (token): ThemedText => ({
            kind: kindOf(token.color),
            text: token.content
          })
        )

        return { ...line, indent, tokens: tokensAfter(indent, tokens) }
      })

      return {
        lines,
        refusalCount: lines.reduce(
          (count, line) => count + line.refusals.length,
          0
        )
      }
    }
  }

let sharedHighlighter: Promise<ExcerptHighlighter> | undefined

/** Colours an excerpt with the one highlighter the build shares. */
export const highlightExcerpt = async (
  code: string
): Promise<HighlightedExcerpt> => {
  sharedHighlighter ??= createExcerptHighlighter()

  return (await sharedHighlighter)(code)
}
