import { composeClassName } from '@adrienlcp/react-aria'
import type React from 'react'
import {
  ProgressBar,
  Button as ReactAriaButton,
  type ButtonProps as ReactAriaButtonProps
} from 'react-aria-components'

import { Icon, type IconName } from '@/presentation/components/icon'

import type { SiteLinkVariant } from './site-link'

import './site-link.sass'

type PendingProps =
  | {
      isPending: boolean
      /** Names the wait for a screen reader: "Sending the note", not "Loading". */
      pendingLabel: string
    }
  | { isPending?: undefined; pendingLabel?: never }

export type SiteButtonProps = Omit<
  ReactAriaButtonProps,
  'children' | 'isPending'
> &
  PendingProps & {
    children: React.ReactNode
    /** Drawn before the label. */
    icon?: IconName
    variant?: SiteLinkVariant
  }

/** A button printed like a site link: same lettering, same frames. */
export const SiteButton: React.FC<SiteButtonProps> = ({
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
    className={composeClassName(className, 'site-link', variant)}
    isPending={isPending}
  >
    {icon !== undefined && <Icon className='site-link-icon' name={icon} />}
    {variant === 'plain' ? (
      children
    ) : (
      <span className='site-link-label'>{children}</span>
    )}
    {isPending === true && (
      <ProgressBar
        aria-label={pendingLabel}
        className='site-button-progress'
        isIndeterminate
      >
        <i />
        <i />
        <i />
      </ProgressBar>
    )}
  </ReactAriaButton>
)
