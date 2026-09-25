import type React from 'react'

import './icon.sass'

/**
 * Drawn on a 24-unit grid with the stroke of the lettering: square ends and
 * mitred corners, heavy enough to sit beside Archivo at 800.
 */
const ICON_PATHS = {
  check: 'M4 12.5l5 5L20 6.5',
  chevronDown: 'M5 9l7 7 7-7',
  close: 'M5.5 5.5l13 13M18.5 5.5l-13 13',
  copy: 'M9 9h11v11H9zM15 9V4H4v11h5',
  mail: 'M3 5.5h18v13H3zM3 5.5l9 7.5 9-7.5',
  newTab: 'M7 17L17 7M8.5 7H17v8.5',
  plus: 'M12 4v16M4 12h16'
} as const

export type IconName = keyof typeof ICON_PATHS

export const ICON_NAMES = Object.keys(ICON_PATHS).filter(
  (name): name is IconName => name in ICON_PATHS
)

type IconProps = {
  className?: string
  name: IconName
}

/** Decorative: the control that holds it carries the name. */
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
