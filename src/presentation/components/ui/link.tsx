import { composeClassName } from '@adrienlcp/react'
import type React from 'react'
import {
  Link as ReactAriaLink,
  type LinkProps as ReactAriaLinkProps
} from 'react-aria-components'

import { relForTarget } from '@/helpers/links'

import {
  ariaCurrentLeftOutOfLinkProps,
  restoreHrefLangDroppedByReactAria
} from './link-quirks'
import { NewTabMark } from './new-tab-mark'
import type { TokenVariant } from './token-variant'

import './token.sass'

export type LinkProps = Omit<ReactAriaLinkProps, 'children'> & {
  children: React.ReactNode
  /** Lights the pip: the link leads to the page on screen. */
  isCurrent?: boolean
  /** The token's print (default: `'plain'`). */
  variant?: TokenVariant
}

/** A link shaped as a token: a place to go, printed as a piece to press. */
export const Link: React.FC<LinkProps> = ({
  children,
  className,
  hrefLang,
  isCurrent = false,
  rel,
  target,
  variant = 'plain',
  ...props
}) => (
  <ReactAriaLink
    {...props}
    {...ariaCurrentLeftOutOfLinkProps(isCurrent, 'page')}
    className={composeClassName(
      className,
      'token',
      variant === 'accent' && 'accent'
    )}
    rel={relForTarget({ rel, target })}
    render={restoreHrefLangDroppedByReactAria(hrefLang)}
    target={target}
  >
    {children}
    {target === '_blank' && <NewTabMark iconClassName='token-icon' />}
  </ReactAriaLink>
)
