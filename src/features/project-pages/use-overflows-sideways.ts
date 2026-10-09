import { useEffect, useState } from 'react'

const overflowsSideways = (element: HTMLElement): boolean =>
  element.scrollWidth > element.clientWidth

/**
 * Whether the element is wider inside than out, kept true to its size and
 * content: a scroller only needs a Tab stop while there is something to scroll.
 */
export const useOverflowsSideways = <TElement extends HTMLElement>(): {
  overflows: boolean
  /** A callback ref: the element is state, so the measure starts once it mounts. */
  attach: (element: TElement | null) => void
} => {
  const [element, setElement] = useState<TElement | null>(null)
  const [overflows, setOverflows] = useState(false)

  useEffect(() => {
    if (element === null) {
      return
    }

    const measure = (): void => setOverflows(overflowsSideways(element))
    const observer = new ResizeObserver(measure)

    observer.observe(element)
    for (const child of element.children) {
      observer.observe(child)
    }
    measure()

    return () => observer.disconnect()
  }, [element])

  return { attach: setElement, overflows }
}
