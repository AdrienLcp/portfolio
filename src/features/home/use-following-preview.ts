import { useCallback, useEffect, useRef, useState } from 'react'

import {
  canPreviewOnPointer,
  prefersReducedMotion,
  viewportSize
} from '@/infrastructure/browser'

/** Where the pointer is, and the edge the picture must stay right of. */
export type PreviewAnchor = {
  clearOf: number
  /** Jumps there at once instead of gliding, as for a keyboard focus. */
  snap?: boolean
  x: number
  y: number
}

const EDGE = 16
const GAP_FROM_POINTER = 48
const GAP_FROM_TEXT = 40
const FOLLOW = 0.16
const MAX_TILT = 8
const REST_TILT = -2

/**
 * A picture that trails the pointer with a little lag and leans into its
 * motion. Positions are written straight to the element on each frame, so
 * moving the pointer never re-renders the list.
 */
export const useFollowingPreview = () => {
  const previewRef = useRef<HTMLDivElement>(null)
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const motion = useRef({
    current: { tilt: REST_TILT, x: 0, y: 0 },
    frame: 0,
    isShown: false,
    target: { x: 0, y: 0 }
  })

  const glide = useCallback(function glide(): void {
    const preview = previewRef.current
    const state = motion.current

    if (preview === null) {
      state.frame = 0
      return
    }

    const isInstant = prefersReducedMotion()
    const ease = isInstant ? 1 : FOLLOW
    const dx = state.target.x - state.current.x
    const dy = state.target.y - state.current.y
    const tilt = isInstant
      ? REST_TILT
      : Math.max(-MAX_TILT, Math.min(MAX_TILT, dx * 0.06)) + REST_TILT

    state.current.x += dx * ease
    state.current.y += dy * ease
    state.current.tilt += (tilt - state.current.tilt) * 0.12
    preview.style.transform = `translate3d(${state.current.x}px, ${state.current.y}px, 0) rotate(${state.current.tilt}deg)`

    const isSettled =
      Math.abs(dx) < 0.3 &&
      Math.abs(dy) < 0.3 &&
      Math.abs(tilt - state.current.tilt) < 0.05
    state.frame = isSettled ? 0 : requestAnimationFrame(glide)
  }, [])

  const show = useCallback(
    (slug: string, { clearOf, snap = false, x, y }: PreviewAnchor) => {
      const preview = previewRef.current

      if (preview === null || !canPreviewOnPointer()) {
        return
      }

      const state = motion.current
      const viewport = viewportSize()
      const width = preview.offsetWidth
      const height = preview.offsetHeight

      state.target.x = Math.min(
        Math.max(x + GAP_FROM_POINTER, clearOf + GAP_FROM_TEXT),
        viewport.width - width - EDGE
      )
      state.target.y = Math.max(
        EDGE,
        Math.min(y - height / 2, viewport.height - height - EDGE)
      )

      if (snap || !state.isShown) {
        state.current.x = state.target.x
        state.current.y = state.target.y
      }

      state.isShown = true
      setActiveSlug(slug)

      if (state.frame === 0) {
        state.frame = requestAnimationFrame(glide)
      }
    },
    [glide]
  )

  const hide = useCallback(() => {
    motion.current.isShown = false
    setActiveSlug(null)
  }, [])

  useEffect(() => {
    const state = motion.current

    return () => cancelAnimationFrame(state.frame)
  }, [])

  return { activeSlug, hide, previewRef, show }
}
