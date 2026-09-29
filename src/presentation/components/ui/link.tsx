import type React from 'react'
import {
  Link as ReactAriaLink,
  type LinkProps as ReactAriaLinkProps
} from 'react-aria-components'

import { relForTarget } from '@/helpers/links'
import { composeClassName } from '@/presentation/components/compose-class-name'

import type { TokenVariant } from './button'
import {
  ariaCurrentLeftOutOfLinkProps,
  restoreHrefLangDroppedByReactAria
} from './link-quirks'
import { NewTabMark } from './new-tab-mark'

import './token.sass'

export type LinkProps = Omit<ReactAriaLinkProps, 'children'> & {
  children: React.ReactNode
  isCurrent?: boolean
  variant?: TokenVariant
}

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
