import type { DictionaryFor } from '@adrienlcp/i18n/dictionary'

import type { EN_DICTIONARY } from './dictionary-en'

export const FR_DICTIONARY: DictionaryFor<typeof EN_DICTIONARY> = {
  about: {
    credit: 'Un jeu d’Adrien Lacourpaille.',
    lead: 'J’ai rangé des pièces détachées pendant six ans. Maintenant, je range du code.',
    path: 'Comment j’en suis arrivé là',
    seeProjects: 'Voir les projets',
    title: 'À propos',
    toolbox: 'La boîte à outils',
    writeToMe: 'M’écrire'
  },
  contact: {
    copied: 'Adresse copiée',
    copy: 'Copier l’adresse',
    elsewhere: 'Ailleurs',
    lead: 'Une question, une idée, ou juste envie de dire bonjour : ma boîte mail est ouverte.',
    noForm:
      'Pas de formulaire ici : ce site n’a pas de serveur, et votre messagerie fait ça très bien.',
    title: 'Contact',
    write: 'Écrire un e-mail'
  },
  cv: {
    download: 'Télécharger le CV',
    downloadPlain: 'Version ATS',
    email: 'E-mail',
    phone: 'Téléphone',
    photo: 'Adrien Lacourpaille, souriant, en chemise sombre',
    plainNote:
      'La version ATS est le même CV sur une seule colonne sobre, pour les logiciels de recrutement.',
    present: 'aujourd’hui',
    sections: {
      contact: 'Coordonnées',
      education: 'Formation',
      experience: 'Expérience',
      extras: 'Divers',
      projects: 'Projets personnels',
      skills: 'Compétences',
      specs: 'En bref',
      summary: 'Profil'
    },
    website: 'Site web'
  },
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
    about: 'À propos',
    contact: 'Contact',
    cv: 'CV',
    home: 'Adrien Lacourpaille, page d’accueil',
    menu: 'Menu',
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
        description:
          'Anglais et français, servis par @adrienlcp/i18n, ma version de l’approche de Web Dev Simplified.',
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
    role: 'Développeur full-stack à Nantes. Des sites, des API, des jeux de soirée.',
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
    lead: 'Ce que je code le soir, une fois le travail fini.',
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
