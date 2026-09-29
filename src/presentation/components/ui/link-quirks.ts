import { createElement } from 'react'
import type { LinkProps as ReactAriaLinkProps } from 'react-aria-components'

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
