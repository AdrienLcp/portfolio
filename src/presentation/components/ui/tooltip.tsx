import type React from 'react'
import {
  OverlayArrow,
  Tooltip as ReactAriaTooltip,
  type TooltipProps as ReactAriaTooltipProps
} from 'react-aria-components'

import { composeClassName } from '@/presentation/components/compose-class-name'

import './tooltip.sass'

export { TooltipTrigger } from 'react-aria-components'

export type TooltipProps = Omit<ReactAriaTooltipProps, 'children'> & {
  children: React.ReactNode
}

/** A slip of print ink tucked under the piece it explains. */
export const Tooltip: React.FC<TooltipProps> = ({
  children,
  className,
  offset = 10,
  ...props
}) => (
  <ReactAriaTooltip
    {...props}
    className={composeClassName(className, 'tooltip')}
    offset={offset}
  >
    <OverlayArrow className='tooltip-arrow'>
      <svg aria-hidden='true' height={7} viewBox='0 0 12 7' width={12}>
        <path d='M0 0L6 7L12 0' />
      </svg>
    </OverlayArrow>
    {children}
  </ReactAriaTooltip>
)
