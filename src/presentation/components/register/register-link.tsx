import { composeClassName } from '@adrienlcp/react-aria'
import type React from 'react'
import {
  Link as ReactAriaLink,
  type LinkProps as ReactAriaLinkProps
} from 'react-aria-components'

import { relForTarget } from '@/helpers/links'
import { Icon, type IconName } from '@/presentation/components/icon'
import { NewTabMark } from '@/presentation/components/ui/new-tab-mark'

import './register-link.sass'

/**
 * How a link is printed in the register:
 * - `'ink'` — a solid ink block, for the one action a section is for
 * - `'line'` — the same block outlined
 * - `'caps'` — condensed capitals with no frame, beside the others
 * - `'plain'` — inherits the text around it
 */
export type RegisterLinkVariant = 'caps' | 'ink' | 'line' | 'plain'

export type RegisterLinkProps = Omit<ReactAriaLinkProps, 'children'> & {
  children: React.ReactNode
  /** Drawn before the label. */
  icon?: IconName
  variant?: RegisterLinkVariant
}

/** A link in the register's lettering; a new tab is announced and marked. */
export const RegisterLink: React.FC<RegisterLinkProps> = ({
  children,
  className,
  icon,
  rel,
  target,
  variant = 'plain',
  ...props
}) => (
  <ReactAriaLink
    {...props}
    className={composeClassName(className, 'register-link', variant)}
    rel={relForTarget({ rel, target })}
    target={target}
  >
    {icon !== undefined && <Icon className='register-link-icon' name={icon} />}
    {variant === 'plain' ? (
      children
    ) : (
      <span className='register-link-label'>{children}</span>
    )}
    {target === '_blank' && <NewTabMark iconClassName='register-link-icon' />}
  </ReactAriaLink>
)
