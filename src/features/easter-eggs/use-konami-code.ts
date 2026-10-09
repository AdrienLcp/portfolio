import { useEffect, useState } from 'react'

import { isKonamiCodeComplete, konamiProgressAfter } from './konami-code'

const isTypingTarget = (target: EventTarget | null): boolean =>
  target instanceof HTMLInputElement ||
  target instanceof HTMLTextAreaElement ||
  (target instanceof HTMLElement && target.isContentEditable)

/**
 * True once the visitor has typed the Konami code anywhere on the page. Heard
 * while capturing, since a focused rail keeps the arrow keys to itself.
 */
export const useKonamiCode = (): boolean => {
  const [isEntered, setIsEntered] = useState(false)

  useEffect(() => {
    if (isEntered) {
      return
    }

    let progress = 0

    const listenForCode = (event: KeyboardEvent): void => {
      if (isTypingTarget(event.target)) {
        return
      }

      progress = konamiProgressAfter(progress, event.key)

      if (isKonamiCodeComplete(progress)) {
        setIsEntered(true)
      }
    }

    addEventListener('keydown', listenForCode, { capture: true })

    return () =>
      removeEventListener('keydown', listenForCode, { capture: true })
  }, [isEntered])

  return isEntered
}
