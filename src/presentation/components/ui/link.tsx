import type React from 'react'
import {
  Link as ReactAriaLink,
  type LinkProps as ReactAriaLinkProps
} from 'react-aria-components'

import { relForTarget } from '@/helpers/links'
import { composeClassName } from '@/presentation/components/compose-class-name'
import { Icon } from '@/presentation/components/icon'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import type { TokenVariant } from './button'
import { VisuallyHidden } from './visually-hidden'

import './token.sass'

export type LinkProps = Omit<ReactAriaLinkProps, 'children'> & {
  children: React.ReactNode
  /** Lights the pip: the link leads to the page on screen. */
  isCurrent?: boolean
  /** The token's print, as on `Button` (default: `'plain'`). */
  variant?: TokenVariant
}

/** A link shaped as a token: a place to go, printed as a piece to press. */
export const Link: React.FC<LinkProps> = ({
  children,
  className,
  isCurrent = false,
  rel,
  target,
  variant = 'plain',
  ...props
}) => (
  <ReactAriaLink
    {...props}
    // react-aria forwards `aria-current` but leaves it out of `LinkProps`.
    {...(isCurrent && { 'aria-current': 'page' })}
    className={composeClassName(
      className,
      'token',
      variant === 'accent' && 'accent'
    )}
    rel={relForTarget({ rel, target })}
    target={target}
  >
    {children}
    {target === '_blank' && <NewTabMark iconClassName='token-icon' />}
  </ReactAriaLink>
)

type NewTabMarkProps = {
  iconClassName: string
}

/** Warns before the jump, in the link's own name. */
export const NewTabMark: React.FC<NewTabMarkProps> = ({ iconClassName }) => {
  const translate = useTranslate()

  return (
    <>
      <Icon className={iconClassName} name='newTab' />
      <VisuallyHidden elementType='span'>{` ${translate('ui.newTab')}`}</VisuallyHidden>
    </>
  )
}
