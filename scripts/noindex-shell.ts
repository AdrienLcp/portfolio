const WHITESPACE_ONLY = /^\s+$/

const TEXT_NODE = 3

/** The whitespace the head indents `element` with: the text node right before it, when it holds nothing else. */
const indentationOf = (element: Element): ChildNode | null => {
  const previous = element.previousSibling

  return previous?.nodeType === TEXT_NODE &&
    WHITESPACE_ONLY.test(previous.textContent ?? '')
    ? previous
    : null
}

/**
 * The shell served, with a 404 status, on a path no page was built for. It
 * stays the bare shell: the not-found page names the path that was asked for,
 * which no build can know, so the app renders it. The robots tag goes last in
 * the head, on a line of its own indented as the shell is.
 */
export const noindexShell = (shell: Document): void => {
  const robots = shell.createElement('meta')

  // linkedom prints attributes last set first: this writes name="robots" content="noindex".
  robots.setAttribute('content', 'noindex')
  robots.setAttribute('name', 'robots')

  const last = shell.head.lastElementChild

  if (last === null) {
    shell.head.append(robots)

    return
  }

  const indentation = indentationOf(last)

  last.after(
    ...(indentation === null ? [robots] : [indentation.cloneNode(), robots])
  )
}
