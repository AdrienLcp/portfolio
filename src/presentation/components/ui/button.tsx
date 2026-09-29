import { composeClassName } from '@adrienlcp/react'
import type React from 'react'
import {
  ProgressBar,
  Button as ReactAriaButton,
  type ButtonProps as ReactAriaButtonProps
} from 'react-aria-components'

import { Icon, type IconName } from '@/presentation/components/icon'

import type { TokenVariant } from './token-variant'

import './token.sass'

type ContentProps =
  | {
      children: React.ReactNode
      /** Drawn after the label. */
      icon?: IconName
    }
  | {
      /** An icon alone names nothing: the label is required. */
      'aria-label': string
      children?: undefined
      icon: IconName
    }

type PendingProps =
  | {
      isPending: boolean
      /**
       * Names the wait for a screen reader — "Copying the address", not
       * "Loading". A progress bar with no name says something is pending
       * without ever saying what.
       */
      pendingLabel: string
    }
  | { isPending?: undefined; pendingLabel?: never }

export type ButtonProps = Omit<
  ReactAriaButtonProps,
  'aria-label' | 'children' | 'isPending'
> &
  ContentProps &
  PendingProps & {
    /** The token's print (default: `'plain'`). */
    variant?: TokenVariant
  }

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  icon,
  isPending,
  pendingLabel,
  variant = 'plain',
  ...props
}) => (
  <ReactAriaButton
    {...props}
    className={composeClassName(
      className,
      'token',
      variant === 'accent' && 'accent',
      children === undefined && 'icon-only'
    )}
    isPending={isPending}
  >
    {children}
    {icon !== undefined && <Icon className='token-icon' name={icon} />}
    {isPending === true && (
      <ProgressBar
        aria-label={pendingLabel}
        className='token-progress'
        isIndeterminate
      />
    )}
  </ReactAriaButton>
)
