import type { HousePackageContent } from '@/features/packages/house-package'

export const HOUSE_PACKAGES: HousePackageContent[] = [
  {
    job: {
      en: 'The router provider every app takes.',
      fr: 'Le fournisseur de routeur que prend chaque app.'
    },
    name: 'react-router',
    released: '2026-10-03',
    version: '0.1.1'
  },
  {
    job: {
      en: 'Translates, and knows at compile time what each message asks for.',
      fr: 'Traduit, et sait dès la compilation ce que chaque message attend.'
    },
    name: 'i18n',
    released: '2026-10-04',
    version: '0.3.0'
  },
  {
    job: {
      en: 'Keeps the chosen theme from flashing, down to the phone’s toolbar.',
      fr: 'Garde le thème choisi sans flash, jusqu’à la barre du téléphone.'
    },
    name: 'theme-preference',
    released: '2026-09-29',
    version: '0.3.0'
  },
  {
    job: {
      en: 'Copies to the clipboard even over plain HTTP, where the Clipboard API does not exist.',
      fr: 'Copie dans le presse-papiers même en HTTP simple, où l’API Clipboard n’existe pas.'
    },
    name: 'browser',
    released: '2026-09-29',
    version: '0.1.1'
  },
  {
    job: {
      en: 'The context helpers every React app starts from.',
      fr: 'Les utilitaires de contexte dont part chaque app React.'
    },
    name: 'react',
    released: '2026-10-03',
    version: '0.3.0'
  },
  {
    job: {
      en: 'The focus ring and class composition over react-aria-components.',
      fr: 'L’anneau de focus et la composition de classes sur react-aria-components.'
    },
    name: 'react-aria',
    released: '2026-09-29',
    version: '0.1.0'
  },
  {
    job: {
      en: 'The reset and shared styles every project starts from.',
      fr: 'Le reset et les styles partagés dont part chaque projet.'
    },
    name: 'styles',
    released: '2026-10-03',
    version: '0.5.0'
  },
  {
    job: {
      en: 'Says whether something worked, without throwing and without null.',
      fr: 'Dit si quelque chose a marché, sans exception et sans null.'
    },
    name: 'result',
    released: '2026-09-29',
    version: '0.1.0'
  },
  {
    job: {
      en: 'Takes the throw out of localStorage and returns a Result instead.',
      fr: 'Ôte les exceptions de localStorage et renvoie un Result à la place.'
    },
    name: 'safe-storage',
    released: '2026-09-29',
    version: '0.1.0'
  },
  {
    job: {
      en: 'The compiler settings every project extends.',
      fr: 'Les réglages du compilateur qu’étend chaque projet.'
    },
    name: 'tsconfig',
    released: '2026-09-29',
    version: '0.1.0'
  },
  {
    job: {
      en: 'The linter and formatter settings every project extends.',
      fr: 'Les réglages du linter et du formateur qu’étend chaque projet.'
    },
    name: 'biome-config',
    released: '2026-09-29',
    version: '0.1.0'
  }
]
