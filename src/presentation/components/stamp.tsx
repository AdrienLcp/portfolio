import type React from 'react'

import './stamp.sass'

type StampListProps = {
  'aria-label'?: string
  children: React.ReactNode
}

export const StampList: React.FC<StampListProps> = ({ children, ...props }) => (
  <ul {...props} className='stamp-list'>
    {children}
  </ul>
)

type StampProps = {
  children: React.ReactNode
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
