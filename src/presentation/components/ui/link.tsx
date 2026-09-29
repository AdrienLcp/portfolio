import type React from 'react'
import { createElement } from 'react'
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
  isCurrent?: boolean
  variant?: TokenVariant
}

export const ariaCurrentLeftOutOfLinkProps = (
  isCurrent: boolean,
  value: 'page' | 'true'
): { 'aria-current'?: 'page' | 'true' } =>
  isCurrent ? { 'aria-current': value } : {}

export const restoreHrefLangDroppedByReactAria = (
  hrefLang: string | undefined
): ReactAriaLinkProps['render'] =>
  hrefLang === undefined
    ? undefined
    : (domProps) => createElement('a', { ...domProps, hrefLang })

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

type NewTabMarkProps = {
  iconClassName: string
}

export const NewTabMark: React.FC<NewTabMarkProps> = ({ iconClassName }) => {
  const translate = useTranslate()

  return (
    <>
      <Icon className={iconClassName} name='newTab' />
      <VisuallyHidden elementType='span'>{` ${translate('ui.newTab')}`}</VisuallyHidden>
    </>
  )
}
