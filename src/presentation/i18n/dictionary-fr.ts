import type { DictionaryFor } from '@adrienlcp/i18n/dictionary'

import type { EN_DICTIONARY } from './dictionary-en'

export const FR_DICTIONARY: DictionaryFor<typeof EN_DICTIONARY> = {
  error: {
    api: {
      invalid_content:
        'Ce contenu n’a pas passé ses propres contrôles et ne peut pas s’afficher.',
      not_found: 'Rien à cette adresse.'
    },
    note: 'Recharger remet en général chaque pièce à sa place.',
    reload: 'Recharger la page',
    title: 'Quelque chose a cassé sur cette page.'
  },
  footer: {
    colophon: 'Adrien Lacourpaille, {year}. Imprimé en pétrole et tomate.'
  },
  header: {
    home: 'Adrien Lacourpaille, page d’accueil',
    navigation: 'Principale',
    otherLocale: 'English',
    projects: 'Projets'
  },
  home: {
    closeLid: 'Refermer le couvercle',
    contents: {
      flash: {
        description:
          'Emplacement vide, et c’est voulu : le bon thème est posé avant le premier affichage.',
        title: 'Flash au chargement'
      },
      games: {
        blindTest: 'Blind test',
        buzzer: 'Buzzer',
        description:
          'Une étagère qui partage une salle, un QR code et tous ses écrans.',
        open: 'Lire les règles de {name}',
        quiz: 'Quiz',
        title: 'Jeux de soirée'
      },
      hover: {
        description:
          'Réservé aux vrais pointeurs : rien ne reste collé après un tap sur un téléphone.',
        title: 'Survol honnête'
      },
      languages: {
        description: 'Anglais et français, servis par @adrienlcp/i18n.',
        title: 'Langues'
      },
      lead: 'Tout est rangé, rien ne manque. Vérifiez avant la première partie.',
      lint: {
        description:
          'Des règles sur mesure et une boîte à outils de conventions partagée.',
        title: 'Jeu de règles de lint'
      },
      packages: {
        description:
          'Écrits pour mes propres projets, réutilisés dans chacun d’eux.',
        title: 'Paquets maison'
      },
      primitives: {
        description:
          'Bâties sur react-aria : clavier, lecteurs d’écran, focus visible.',
        title: 'Jeu de primitives accessibles'
      },
      server: {
        description:
          'Hono et WebSocket : la salle, les manches, et qui a buzzé en premier.',
        title: 'Serveur temps réel'
      },
      themes: {
        description:
          'Jour et nuit, selon votre système ou votre choix sur le rail.',
        title: 'Thèmes'
      },
      title: 'Contenu de la boîte'
    },
    openBox: 'Ouvrir la boîte',
    role: 'Développeur full-stack. Je livre des choses finies, du socket jusqu’au dernier survol.',
    title: 'Adrien Lacourpaille'
  },
  notFound: {
    backHome: 'Retour à l’accueil',
    message: 'Aucune page à l’adresse {path}.',
    note: 'Cette pièce n’est pas dans la boîte.'
  },
  project: {
    allProjects: 'Tous les projets',
    highlights: 'Dans la boîte',
    live: 'Y jouer',
    repository: 'Lire le code',
    stack: 'Stack technique'
  },
  projects: {
    lead: 'Uniquement des jeux finis, jusqu’à la dernière pièce.',
    open: 'Lire les règles de {name}',
    title: 'Projets'
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
