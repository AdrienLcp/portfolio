import { composeClassName } from '@adrienlcp/react-aria'
import type React from 'react'
import {
  Link as ReactAriaLink,
  type LinkProps as ReactAriaLinkProps
} from 'react-aria-components'

import { relForTarget } from '@/helpers/links'
import { Icon, type IconName } from '@/presentation/components/icon'
import { NewTabMark } from '@/presentation/components/ui/new-tab-mark'

import './site-link.sass'

/**
 * How a link is drawn:
 * - `'ink'` — a solid ink pill, for the one action a section is for
 * - `'line'` — a soft pill beside it
 * - `'caps'` — condensed capitals with no frame, beside the others
 * - `'plain'` — inherits the text around it
 */
export type SiteLinkVariant = 'caps' | 'ink' | 'line' | 'plain'

export type SiteLinkProps = Omit<ReactAriaLinkProps, 'children'> &
  React.RefAttributes<HTMLAnchorElement> & {
    children: React.ReactNode
    /** Drawn before the label. */
    icon?: IconName
    variant?: SiteLinkVariant
  }

/** A link in the site's lettering; a new tab is announced and marked. */
export const SiteLink: React.FC<SiteLinkProps> = ({
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
    className={composeClassName(className, 'site-link', variant)}
    rel={relForTarget({ rel, target })}
    target={target}
  >
    {icon !== undefined && <Icon className='site-link-icon' name={icon} />}
    {variant === 'plain' ? (
      children
    ) : (
      <span className='site-link-label'>{children}</span>
    )}
    {target === '_blank' && <NewTabMark iconClassName='site-link-icon' />}
  </ReactAriaLink>
)
