import type { DictionaryFor } from '@adrienlcp/i18n/dictionary'

import type { EN_DICTIONARY } from './dictionary-en'

export const FR_DICTIONARY: DictionaryFor<typeof EN_DICTIONARY> = {
  error: {
    reload: 'Recharger la page',
    title: 'Quelque chose a cassé sur cette page.'
  },
  home: {
    otherLocale: 'English version',
    status: 'Portfolio en construction.',
    title: 'Adrien Lacourpaille'
  },
  notFound: {
    backHome: 'Retour à l’accueil',
    message: 'Aucune page à l’adresse {path}.'
  },
  theme: {
    auto: 'Auto',
    dark: 'Nuit',
    label: 'Thème',
    light: 'Jour'
  },
  ui: {
    close: 'Fermer',
    newTab: '(s’ouvre dans un nouvel onglet)'
  }
}
