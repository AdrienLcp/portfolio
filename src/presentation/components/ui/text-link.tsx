import type React from 'react'
import {
  Link as ReactAriaLink,
  type LinkProps as ReactAriaLinkProps
} from 'react-aria-components'

import { relForTarget } from '@/helpers/links'
import { composeClassName } from '@/presentation/components/compose-class-name'

import { NewTabMark } from './link'

import './text-link.sass'

export type TextLinkProps = Omit<ReactAriaLinkProps, 'children'> & {
  children: React.ReactNode
}

/** A link inside a sentence: underlined, never a token. */
export const TextLink: React.FC<TextLinkProps> = ({
  children,
  className,
  rel,
  target,
  ...props
}) => (
  <ReactAriaLink
    {...props}
    className={composeClassName(className, 'text-link')}
    rel={relForTarget({ rel, target })}
    target={target}
  >
    {children}
    {target === '_blank' && <NewTabMark iconClassName='text-link-icon' />}
  </ReactAriaLink>
)
