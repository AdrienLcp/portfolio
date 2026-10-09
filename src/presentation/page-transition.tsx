import type React from 'react'
import { ViewTransition } from 'react'
import { useLocation } from 'react-router'

import './page-transition.sass'

/**
 * One view transition per page change: keyed by path, the page leaving and the
 * page arriving are two subtrees, and nothing else animates, neither the first
 * load nor an update inside a page such as a hash link.
 */
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { pathname } = useLocation()

  return (
    <ViewTransition
      default='none'
      enter='page-in'
      exit='page-out'
      key={pathname}
    >
      {children}
    </ViewTransition>
  )
}
