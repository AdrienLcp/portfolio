import type React from 'react'

import type { Translate } from '@/presentation/i18n/translation'

/** The two drawings made for an app: its screens, and how it works inside. */
export type Plates = {
  Drawing: React.FC
  Mechanism: React.FC
  mechanismTitle: (translate: Translate) => string
}

/** An app nobody drew for has no plates. */
export type PlatesBySlug = Readonly<Partial<Record<string, Plates>>>

/**
 * One chunk per app, so a project page downloads its own drawings and not the
 * whole register's.
 */
const LOAD_PLATES: Record<string, () => Promise<Plates>> = {
  analytics: async () => {
    const { AnalyticsDrawing, AnalyticsMechanism } = await import(
      './drawings/analytics-drawings'
    )

    return {
      Drawing: AnalyticsDrawing,
      Mechanism: AnalyticsMechanism,
      mechanismTitle: (translate) => translate('home.mechanisms.analytics')
    }
  },
  'on-record': async () => {
    const { OnRecordDrawing, OnRecordMechanism } = await import(
      './drawings/on-record-drawings'
    )

    return {
      Drawing: OnRecordDrawing,
      Mechanism: OnRecordMechanism,
      mechanismTitle: (translate) => translate('home.mechanisms.onRecord')
    }
  },
  seance: async () => {
    const { SeanceDrawing, SeanceMechanism } = await import(
      './drawings/seance-drawings'
    )

    return {
      Drawing: SeanceDrawing,
      Mechanism: SeanceMechanism,
      mechanismTitle: (translate) => translate('home.mechanisms.seance')
    }
  },
  taverla: async () => {
    const { TaverlaDrawing, TaverlaMechanism } = await import(
      './drawings/taverla-drawings'
    )

    return {
      Drawing: TaverlaDrawing,
      Mechanism: TaverlaMechanism,
      mechanismTitle: (translate) => translate('home.mechanisms.taverla')
    }
  }
}

export const DRAWN_SLUGS = Object.keys(LOAD_PLATES)

/**
 * How Vite's build manifest keys each app's drawings, so the prerender can
 * preload the chunk a page's loader is about to import.
 */
export const plateModuleFor = (slug: string): string | null =>
  slug in LOAD_PLATES
    ? `src/features/register/drawings/${slug}-drawings.tsx`
    : null

export const loadPlates = async (
  slugs: readonly string[]
): Promise<PlatesBySlug> =>
  Object.fromEntries(
    await Promise.all(
      slugs.flatMap((slug) => {
        const load = LOAD_PLATES[slug]

        return load === undefined
          ? []
          : [load().then((plates) => [slug, plates] as const)]
      })
    )
  )
