import { useState, useSyncExternalStore } from 'react'

import { sendsGlobalPrivacyControl } from '@/infrastructure/browser'
import {
  readAnalyticsOptOut,
  writeAnalyticsOptOut
} from '@/infrastructure/storage/analytics-opt-out-storage'

/**
 * Whether this browser's visits are counted: by the visitor's choice here,
 * by Global Privacy Control, or not at all where storage is blocked.
 */
export type MeasurementChoice =
  | 'counted'
  | 'refused'
  | 'refused-by-browser'
  | 'storage-blocked'

const readMeasurementChoice = (): MeasurementChoice => {
  if (sendsGlobalPrivacyControl()) {
    return 'refused-by-browser'
  }

  const optOut = readAnalyticsOptOut()

  if (optOut.status === 'failure') {
    return 'storage-blocked'
  }

  return optOut.data ? 'refused' : 'counted'
}

/** The prerender knows nothing of the visitor's browser: it paints the default. */
const countedOnTheServer = (): MeasurementChoice => 'counted'

const listeners = new Set<() => void>()

/** Follows a write here and one made in another tab of the site. */
const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener)
  window.addEventListener('storage', listener)

  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', listener)
  }
}

export const useMeasurementChoice = () => {
  const choice = useSyncExternalStore(
    subscribe,
    readMeasurementChoice,
    countedOnTheServer
  )
  const [hasSaveFailed, setHasSaveFailed] = useState(false)

  const setCounted = (isCounted: boolean): void => {
    const saved = writeAnalyticsOptOut(!isCounted)

    setHasSaveFailed(saved.status === 'failure')
    for (const listener of listeners) {
      listener()
    }
  }

  return { choice, hasSaveFailed, setCounted }
}
