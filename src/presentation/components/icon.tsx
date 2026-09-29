import type React from 'react'

import './icon.sass'

const ICON_PATHS = {
  buzzer: 'M5 15a7 7 0 0 1 14 0M3 15h18v5H3zM12 4V2',
  check: 'M4 12.5l5 5L20 6.5',
  chevronDown: 'M5 9l7 7 7-7',
  chevronUp: 'M5 15l7-7 7 7',
  close: 'M5.5 5.5l13 13M18.5 5.5l-13 13',
  copy: 'M9 9h11v11H9zM15 9V4H4v11h5',
  download: 'M12 3v12M6.5 9.5L12 15l5.5-5.5M4 20h16',
  mail: 'M3 5.5h18v13H3zM3 5.5l9 7.5 9-7.5',
  menu: 'M4 6.5h16M4 12h16M4 17.5h16',
  newTab: 'M7 17L17 7M8.5 7H17v8.5',
  note: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0a3 3 0 1 1 6 0M20 16a3 3 0 1 1-6 0a3 3 0 1 1 6 0',
  plus: 'M12 4v16M4 12h16',
  question:
    'M4 3h16v18H4zM9 9.5a3 3 0 1 1 4.2 2.7c-.8.4-1.2 1-1.2 1.8v.5M12 17v1.5',
  send: 'M21 3L10 14M21 3l-7 18-4-7-7-4z'
} as const

export type IconName = keyof typeof ICON_PATHS

type IconProps = {
  className?: string
  name: IconName
}

export const Icon: React.FC<IconProps> = ({ className, name }) => (
  <svg
    aria-hidden='true'
    className={className === undefined ? 'icon' : `icon ${className}`}
    focusable='false'
    viewBox='0 0 24 24'
  >
    <path d={ICON_PATHS[name]} />
  </svg>
)
