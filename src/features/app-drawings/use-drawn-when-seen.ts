import { type RefObject, useEffect, useState } from 'react'

import { canObserveIntersections } from '@/infrastructure/browser'

/** Most of the diagram on screen before its lines start drawing. */
const VISIBLE_SHARE_BEFORE_DRAWING = 0.35

/**
 * Turns true the first time the element is both active (its drawer open) and
 * on screen, and stays true: a diagram draws itself once, not on every pass.
 */
export const useDrawnWhenSeen = (
  ref: RefObject<Element | null>,
  isActive: boolean
): boolean => {
  const [isDrawn, setIsDrawn] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!isActive || isDrawn || element === null) {
      return
    }

    if (!canObserveIntersections()) {
      setIsDrawn(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsDrawn(true)
          observer.disconnect()
        }
      },
      { threshold: VISIBLE_SHARE_BEFORE_DRAWING }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [isActive, isDrawn, ref])

  return isDrawn
}
