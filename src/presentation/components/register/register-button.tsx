import { composeClassName } from '@adrienlcp/react-aria'
import type React from 'react'
import {
  ProgressBar,
  Button as ReactAriaButton,
  type ButtonProps as ReactAriaButtonProps
} from 'react-aria-components'

import { Icon, type IconName } from '@/presentation/components/icon'

import type { RegisterLinkVariant } from './register-link'

import './register-link.sass'

type PendingProps =
  | {
      isPending: boolean
      /** Names the wait for a screen reader: "Sending the note", not "Loading". */
      pendingLabel: string
    }
  | { isPending?: undefined; pendingLabel?: never }

export type RegisterButtonProps = Omit<
  ReactAriaButtonProps,
  'children' | 'isPending'
> &
  PendingProps & {
    children: React.ReactNode
    /** Drawn before the label. */
    icon?: IconName
    variant?: RegisterLinkVariant
  }

/** A button printed like a register link: same lettering, same frames. */
export const RegisterButton: React.FC<RegisterButtonProps> = ({
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
    className={composeClassName(className, 'register-link', variant)}
    isPending={isPending}
  >
    {icon !== undefined && <Icon className='register-link-icon' name={icon} />}
    {children}
    {isPending === true && (
      <ProgressBar
        aria-label={pendingLabel}
        className='register-progress'
        isIndeterminate
      >
        <i />
        <i />
        <i />
      </ProgressBar>
    )}
  </ReactAriaButton>
)
