import type React from 'react'

import type { Locale } from '@/presentation/i18n/locale'
import type { Translate } from '@/presentation/i18n/translation'

import { loadDrawingText } from './drawings/drawing-text'

/** The two drawings made for an app: its screens, and how it works inside. */
export type Plates = {
  Drawing: React.FC
  Mechanism: React.FC
  mechanismTitle: (translate: Translate) => string
}

/** An app nobody drew for has no plates. */
export type PlatesBySlug = Readonly<Partial<Record<string, Plates>>>

type PlateLoaders = {
  loadDrawing: () => Promise<React.FC>
  loadMechanism: () => Promise<React.FC>
  mechanismTitle: (translate: Translate) => string
}

/** One chunk per app and per drawing, so a project page downloads its own drawings only. */
const PLATE_LOADERS: Record<string, PlateLoaders> = {
  analytics: {
    loadDrawing: async () =>
      (await import('./drawings/analytics-drawing')).AnalyticsDrawing,
    loadMechanism: async () =>
      (await import('./drawings/analytics-mechanism')).AnalyticsMechanism,
    mechanismTitle: (translate) => translate('home.mechanisms.analytics')
  },
  'on-record': {
    loadDrawing: async () =>
      (await import('./drawings/on-record-drawing')).OnRecordDrawing,
    loadMechanism: async () =>
      (await import('./drawings/on-record-mechanism')).OnRecordMechanism,
    mechanismTitle: (translate) => translate('home.mechanisms.onRecord')
  },
  scoreboard: {
    loadDrawing: async () =>
      (await import('./drawings/scoreboard-drawing')).ScoreboardDrawing,
    loadMechanism: async () =>
      (await import('./drawings/scoreboard-mechanism')).ScoreboardMechanism,
    mechanismTitle: (translate) => translate('home.mechanisms.scoreboard')
  },
  seance: {
    loadDrawing: async () =>
      (await import('./drawings/seance-drawing')).SeanceDrawing,
    loadMechanism: async () =>
      (await import('./drawings/seance-mechanism')).SeanceMechanism,
    mechanismTitle: (translate) => translate('home.mechanisms.seance')
  },
  taverla: {
    loadDrawing: async () =>
      (await import('./drawings/taverla-drawing')).TaverlaDrawing,
    loadMechanism: async () =>
      (await import('./drawings/taverla-mechanism')).TaverlaMechanism,
    mechanismTitle: (translate) => translate('home.mechanisms.taverla')
  }
}

export const loadPlates = async (
  slugs: readonly string[],
  locale: Locale
): Promise<PlatesBySlug> => {
  const [plates] = await Promise.all([
    Promise.all(
      slugs.flatMap((slug) => {
        const loaders = PLATE_LOADERS[slug]

        return loaders === undefined
          ? []
          : [
              Promise.all([
                loaders.loadDrawing(),
                loaders.loadMechanism()
              ]).then(
                ([Drawing, Mechanism]) =>
                  [
                    slug,
                    {
                      Drawing,
                      Mechanism,
                      mechanismTitle: loaders.mechanismTitle
                    }
                  ] as const
              )
            ]
      })
    ),
    loadDrawingText(locale)
  ])

  return Object.fromEntries(plates)
}
