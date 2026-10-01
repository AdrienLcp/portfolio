import { defineDictionary } from '@adrienlcp/i18n'

export const FR_DICTIONARY = defineDictionary({
  about: {
    credit: 'Un jeu d’Adrien Lacourpaille.',
    lead: 'J’ai rangé des pièces détachées pendant six ans. Maintenant, je range du code.',
    path: 'Comment j’en suis arrivé là',
    seeProjects: 'Voir les projets',
    title: 'À propos',
    toolbox: 'La boîte à outils',
    writeToMe: 'M’écrire'
  },
  common: {
    github: 'GitHub',
    linkedin: 'LinkedIn'
  },
  contact: {
    copied: 'Adresse copiée',
    copy: 'Copier l’adresse',
    elsewhere: 'Ailleurs',
    form: {
      again: 'En écrire une autre',
      email: 'Votre e-mail',
      emailHint: 'Uniquement pour vous répondre.',
      emailInvalid: 'Cette adresse semble incomplète : du type nom@exemple.fr.',
      emailMissing: 'Une adresse, pour que je puisse répondre.',
      failure: {
        refused:
          'Le service d’envoi a refusé la carte. Réessayez, ou écrivez à l’adresse ci-dessus.',
        unreachable:
          'La carte n’a pas pu partir : la connexion semble coupée. Réessayez dans un instant, ou écrivez à l’adresse ci-dessus.'
      },
      message: 'Votre message',
      messageMissing: 'La carte est encore vierge.',
      name: 'Votre nom',
      nameMissing: 'Dites-moi qui écrit.',
      posted: 'Postée',
      postedNote:
        'Merci d’avoir écrit. Je lis tout, et je réponds depuis ma propre boîte.',
      send: 'Envoyer la carte',
      sending: 'Envoi de la carte',
      title: 'Ou remplissez la carte-réponse'
    },
    lead: 'Une question, une idée, ou juste envie de dire bonjour : ma boîte mail est ouverte.',
    title: 'Contact',
    write: 'Écrire un e-mail'
  },
  cv: {
    download: 'Télécharger le CV',
    downloadPlain: 'Version ATS',
    email: 'E-mail',
    labelSeparator: ' : ',
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
    projects: 'Projets',
    skip: 'Aller au contenu'
  },
  home: {
    closeLid: 'Refermer le couvercle',
    contents: {
      flash: {
        description:
          'Emplacement vide, et c’est voulu : le bon thème est posé avant le premier affichage.',
        title: 'Flash au chargement'
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
      onRecord: {
        description:
          'Chaque scrutin public de l’Assemblée, reconstruit la nuit depuis son open data, là seulement où quelque chose a changé. Chaque chiffre renvoie à son compte rendu officiel.',
        title: 'Job de nuit, sans serveur'
      },
      packages: {
        description:
          'Testés, publiés depuis la CI avec la provenance npm, et installés par ce site, Taverla, Séance et on-record.',
        open: 'Voir ce qu’ils font',
        title: 'Paquets publiés sur npm'
      },
      primitives: {
        description:
          'Bâties sur react-aria : clavier, lecteurs d’écran, focus visible.',
        title: 'Jeu de primitives accessibles'
      },
      seance: {
        description:
          'Séance s’installe, tourne réseau coupé et garde chaque chiffre sur l’appareil.',
        title: 'Serveur à joindre'
      },
      taverla: {
        blindTest: 'Blind test',
        buzzer: 'Buzzer',
        description:
          'Un serveur temps réel, une salle, un QR code : tous les téléphones de la pièce buzzent au même instant.',
        quiz: 'Quiz',
        title: 'Jeux de soirée sur un serveur temps réel'
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
  locale: {
    label: 'Langue'
  },
  notFound: {
    backHome: 'Retour à l’accueil',
    message: 'Aucune page à l’adresse {path}.',
    note: 'Cette pièce n’est pas dans la boîte.'
  },
  project: {
    allProjects: 'Tous les projets',
    highlights: 'Dans la boîte',
    live: {
      app: 'L’ouvrir',
      game: 'Y jouer',
      library: 'Les essayer'
    },
    package: '{name} sur npm',
    repository: 'Lire le code',
    samples: {
      app: 'Comment ça marche',
      game: 'Comment ça se joue',
      library: 'Comment on s’en sert'
    },
    stack: 'Stack technique'
  },
  projects: {
    lead: 'Ce que je code le soir, une fois le travail fini.',
    open: {
      app: 'Découvrir {name}',
      game: 'Lire les règles de {name}',
      library: 'Découvrir {name}'
    },
    title: 'Projets'
  },
  theme: {
    dark: 'Nuit',
    label: 'Thème',
    light: 'Jour',
    system: 'Auto'
  },
  ui: {
    close: 'Fermer',
    newTab: '(s’ouvre dans un nouvel onglet)'
  }
})
