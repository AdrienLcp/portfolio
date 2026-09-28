import type React from 'react'

import './stamp.sass'

type StampListProps = {
  'aria-label'?: string
  children: React.ReactNode
}

/** Tags printed on a contents list: read, never pressed. */
export const StampList: React.FC<StampListProps> = ({ children, ...props }) => (
  <ul {...props} className='stamp-list'>
    {children}
  </ul>
)

type StampProps = {
  children: React.ReactNode
  /** Set in code type, for a package name or anything typed as is. */
  isCode?: boolean
  lang?: string
}

export const Stamp: React.FC<StampProps> = ({
  children,
  isCode = false,
  lang
}) => (
  <li className={isCode ? 'stamp code' : 'stamp'} lang={lang}>
    {children}
  </li>
)
