import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { basename, extname, resolve } from 'node:path'
import process from 'node:process'

import { parseSync } from 'oxc-parser'

type Comment = { file: string; line: number; text: string }

const REPOSITORY_ROOT = resolve(import.meta.dirname, '..')

const SCRIPT_EXTENSIONS = new Set([
  '.cjs',
  '.js',
  '.mjs',
  '.mts',
  '.ts',
  '.tsx'
])
const STYLE_EXTENSIONS = new Set(['.css', '.sass', '.scss'])
const MARKUP_EXTENSIONS = new Set(['.html'])
const HASH_EXTENSIONS = new Set(['.yaml', '.yml'])
const HASH_FILES = new Set([
  '.env',
  '.gitattributes',
  '.gitignore',
  '_headers',
  '_redirects',
  'pre-commit'
])
const GRIT_EXTENSIONS = new Set(['.grit'])

const DIRECTIVE_PATTERNS = [/^\/\/\s*biome-ignore/, /^\/\/\/\s*<reference\s/]
const SHEBANG = /^#!/

const isDirective = (text: string) =>
  DIRECTIVE_PATTERNS.some((pattern) => pattern.test(text))

const lineOf = (source: string, position: number) =>
  source.slice(0, position).split('\n').length

const firstLine = (text: string) => (text.split('\n')[0] ?? '').trim()

const scriptComments = (file: string, source: string): Comment[] =>
  parseSync(file, source)
    .comments.map(({ end, start }) => ({
      position: start,
      text: source.slice(start, end)
    }))
    .filter(({ text }) => !isDirective(text))
    .map(({ position, text }) => ({
      file,
      line: lineOf(source, position),
      text: firstLine(text)
    }))

const QUOTES = new Set(['"', "'", '`'])

const delimitedComments = (
  file: string,
  source: string,
  openers: { open: string; close: string }[]
): Comment[] => {
  const comments: Comment[] = []
  let index = 0

  while (index < source.length) {
    const character = source.charAt(index)

    if (QUOTES.has(character)) {
      const end = source.indexOf(character, index + 1)
      index = end === -1 ? source.length : end + 1
      continue
    }

    if (source.startsWith('url(', index)) {
      const end = source.indexOf(')', index)
      index = end === -1 ? source.length : end + 1
      continue
    }

    const opener = openers.find(({ open }) => source.startsWith(open, index))
    if (!opener) {
      index += 1
      continue
    }

    const closeAt = source.indexOf(opener.close, index + opener.open.length)
    const end = closeAt === -1 ? source.length : closeAt + opener.close.length
    comments.push({
      file,
      line: lineOf(source, index),
      text: firstLine(source.slice(index, end))
    })
    index = end
  }

  return comments
}

const hashComments = (file: string, source: string): Comment[] =>
  source.split('\n').flatMap((line, index) => {
    if (index === 0 && SHEBANG.test(line)) return []
    const match = /(^|\s)#/.exec(line.replace(/(["'])(?:(?!\1).)*\1/g, '""'))
    if (!match) return []
    return [{ file, line: index + 1, text: line.trim() }]
  })

const commentsIn = (file: string): Comment[] => {
  const source = readFileSync(resolve(REPOSITORY_ROOT, file), 'utf8')
  const extension = extname(file)

  if (SCRIPT_EXTENSIONS.has(extension)) return scriptComments(file, source)
  if (STYLE_EXTENSIONS.has(extension) || GRIT_EXTENSIONS.has(extension))
    return delimitedComments(file, source, [
      { close: '\n', open: '//' },
      { close: '*/', open: '/*' }
    ])
  if (MARKUP_EXTENSIONS.has(extension))
    return delimitedComments(file, source, [{ close: '-->', open: '<!--' }])
  if (HASH_EXTENSIONS.has(extension) || HASH_FILES.has(basename(file)))
    return hashComments(file, source)
  return []
}

const trackedFiles = () =>
  execFileSync('git', ['ls-files', '-z'], {
    cwd: REPOSITORY_ROOT,
    encoding: 'utf8'
  })
    .split('\0')
    .filter(Boolean)

const comments = trackedFiles().flatMap(commentsIn)

if (comments.length === 0) {
  console.info('No comment in any tracked file.')
} else {
  for (const { file, line, text } of comments) {
    console.error(`${file}:${line}  ${text}`)
  }
  console.error(
    `\n${comments.length} comments. Carry the fact in a name instead: a constant, a function, a type.`
  )
  process.exitCode = 1
}
