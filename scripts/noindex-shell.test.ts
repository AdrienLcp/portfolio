import { parseDocument, serializeDocument } from '@adrienlcp/prerender'
import { describe, expect, it } from 'vitest'

import { noindexShell } from './noindex-shell'

const headOf = (document: Document): string =>
  serializeDocument(document).split('<head>')[1]?.split('</head>')[0] ?? ''

describe('noindexShell', () => {
  it('puts the robots tag last in the head, indented as the shell is', () => {
    const document = parseDocument(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Shell</title>
  </head>
  <body><div id="root"></div></body>
</html>`)

    noindexShell(document)

    expect(headOf(document)).toBe(`
    <meta charset="utf-8">
    <title>Shell</title>
    <meta name="robots" content="noindex">
  `)
  })

  it('appends to an empty head with no indentation to copy', () => {
    const document = parseDocument(
      '<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>'
    )

    noindexShell(document)

    expect(headOf(document)).toBe('<meta name="robots" content="noindex">')
  })

  it('adds no indentation after a head element that shares its line', () => {
    const document = parseDocument(
      '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>'
    )

    noindexShell(document)

    expect(headOf(document)).toBe(
      '<meta charset="utf-8"><meta name="robots" content="noindex">'
    )
  })
})
