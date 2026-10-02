import type React from 'react'

import type { Translate } from '@/presentation/i18n/translation'

import {
  AnalyticsDrawing,
  AnalyticsMechanism
} from './drawings/analytics-drawings'
import {
  OnRecordDrawing,
  OnRecordMechanism
} from './drawings/on-record-drawings'
import { SeanceDrawing, SeanceMechanism } from './drawings/seance-drawings'
import { TaverlaDrawing, TaverlaMechanism } from './drawings/taverla-drawings'

/** The two drawings made for an app: its screens, and how it works inside. */
export type Plates = {
  Drawing: React.FC
  Mechanism: React.FC
  mechanismTitle: (translate: Translate) => string
}

const PLATES: Record<string, Plates> = {
  analytics: {
    Drawing: AnalyticsDrawing,
    Mechanism: AnalyticsMechanism,
    mechanismTitle: (translate) => translate('home.mechanisms.analytics')
  },
  'on-record': {
    Drawing: OnRecordDrawing,
    Mechanism: OnRecordMechanism,
    mechanismTitle: (translate) => translate('home.mechanisms.onRecord')
  },
  seance: {
    Drawing: SeanceDrawing,
    Mechanism: SeanceMechanism,
    mechanismTitle: (translate) => translate('home.mechanisms.seance')
  },
  taverla: {
    Drawing: TaverlaDrawing,
    Mechanism: TaverlaMechanism,
    mechanismTitle: (translate) => translate('home.mechanisms.taverla')
  }
}

export const platesFor = (slug: string): Plates | undefined => PLATES[slug]
