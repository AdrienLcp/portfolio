import type React from 'react'
import {
  Dialog,
  Popover as ReactAriaPopover,
  type PopoverProps as ReactAriaPopoverProps
} from 'react-aria-components'

export type PopoverProps = Omit<
  ReactAriaPopoverProps,
  'aria-label' | 'children'
> & {
  'aria-label': string
  children: React.ReactNode
  dialogClassName: string
}

export const Popover: React.FC<PopoverProps> = ({
  'aria-label': ariaLabel,
  children,
  dialogClassName,
  ...props
}) => (
  <ReactAriaPopover {...props}>
    <Dialog aria-label={ariaLabel} className={dialogClassName}>
      {children}
    </Dialog>
  </ReactAriaPopover>
)
