import type React from 'react'

import './main.sass'

const MAIN_ID = 'main'

export const MAIN_HREF = `#${MAIN_ID}`

export const Main: React.FC<
  Omit<React.ComponentProps<'main'>, 'id' | 'tabIndex'>
> = (props) => <main {...props} id={MAIN_ID} tabIndex={-1} />

export const focusMain = (options?: FocusOptions): void => {
  document.getElementById(MAIN_ID)?.focus(options)
}
