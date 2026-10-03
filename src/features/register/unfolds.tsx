import type React from 'react'
import { ViewTransition } from 'react'

import './unfolding.sass'

/** The pieces a register row hands over to its entry's page. */
type UnfoldPart = 'dates' | 'figure' | 'name' | 'sheet'

type UnfoldsProps = {
  children: React.ReactNode
  part: UnfoldPart
  /** The entry the part belongs to; `null` hands nothing over. */
  slug: string | null
}

/**
 * Names a part the same way on the row and on the page, so React pairs the two
 * when one replaces the other and the row unfolds into the page, or folds back.
 * Anything else that changes around it, a hash link or a drawer, does not move it.
 */
export const Unfolds: React.FC<UnfoldsProps> = ({ children, part, slug }) =>
  slug === null ? (
    children
  ) : (
    <ViewTransition
      default='none'
      name={`entry-${part}-${slug}`}
      share={`unfold-${part}`}
    >
      {children}
    </ViewTransition>
  )
