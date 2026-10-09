import { defineDictionary, defineTranslation } from '@adrienlcp/i18n'

export const FR_DICTIONARY = defineDictionary({
  about: {
    after: {
      allProjects: 'Tous les projets',
      bridge:
        'Les soirées vont toujours au code. Chaque appli est née d’un vrai besoin.',
      off: 'Hors du clavier : le cinéma, et le tennis de table.',
      title: 'Où passent les soirées'
    },
    lead: 'Je ne suis pas entré par une école. Je suis entré par une réserve, un supermarché à 5 h du matin et une formation à distance. Voici le chemin, étape par étape.',
    path: {
      title: 'Le chemin jusqu’ici'
    }
  },
  common: {
    github: 'GitHub',
    linkedin: 'LinkedIn'
  },
  contact: {
    copied: 'Adresse copiée',
    copy: 'Copier l’adresse',
    copyFailed:
      'La copie n’a pas marché ici : l’adresse est sélectionnée, copiez-la à la main.',
    elsewhere: {
      cv: 'Mis en page, et sobre',
      cvNote: 'L’un pour les gens, l’autre pour les logiciels de recrutement',
      github: 'Chaque appli et chaque package, en clair',
      linkedin: 'La version professionnelle du bonjour',
      title: 'Ailleurs'
    },
    form: {
      again: 'Écrire un autre mot',
      email: 'E-mail',
      emailHint: 'Uniquement pour vous répondre.',
      emailInvalid: 'Cette adresse semble incomplète : du type nom@exemple.fr.',
      emailMissing: 'Une adresse, pour que je puisse répondre.',
      failure: {
        refused:
          'Le service d’envoi a refusé le mot. Réessayez, ou écrivez à l’adresse ci-dessus.',
        unreachable:
          'Le mot n’a pas pu partir : la connexion semble coupée. Réessayez dans un instant, ou écrivez à l’adresse ci-dessus.'
      },
      intro:
        'Il arrive dans la même boîte. Pas de compte, pas de newsletter, juste vos mots et une adresse pour vous répondre.',
      message: 'Message',
      messageMissing: 'Le message est encore vide.',
      name: 'Nom',
      nameMissing: 'Dites-moi qui écrit.',
      send: 'Envoyer le mot',
      sending: 'Envoi du mot',
      sent: 'Merci d’avoir écrit. Je lis tout, et je réponds depuis ma propre boîte.',
      title: 'Ou laissez un mot ici'
    },
    lead: 'Une question, une idée, ou juste envie de dire bonjour : ma boîte mail est ouverte.',
    standing: {
      cv: 'CV',
      lookingAfter: 'dit tout le reste.',
      lookingBefore: 'Je cherche l’équipe avec qui construire la suite. Le',
      role: 'Développeur full-stack basé à Nantes, ouvert aux postes sur Angers et en Vendée.'
    },
    write: 'Écrire un e-mail'
  },
  cv: {
    download: 'Télécharger le CV',
    downloadPlain: 'Version ATS',
    email: 'E-mail',
    labelSeparator: ' : ',
    location: 'Localisation',
    month: defineTranslation('{month:date}', {
      date: { month: { month: 'long', year: 'numeric' } }
    }),
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
      interests: 'Langues et centres d’intérêt',
      projects: 'Projets personnels',
      skills: 'Compétences',
      specs: 'En bref',
      summary: 'Profil'
    },
    website: 'Site web'
  },
  easterEggs: {
    blueprint: {
      leave: 'Changez de thème encore une fois pour quitter la table à dessin.',
      title: 'Table à dessin',
      unlocked:
        'Thème plan débloqué : le site tel qu’il était sur la table à dessin.'
    },
    console: {
      contact: 'Écrivez-moi : {url}',
      hint: 'P.-S. Le site cache un projet de plus. ↑ ↑ ↓ ↓ ← → ← → B A',
      lead: 'Vous avez ouvert la console. C’est exactement la curiosité que je cherche dans une équipe, et celle que j’y apporte.',
      source: 'Chaque ligne de ce site est ouverte : {url}',
      title: 'Adrien Lacourpaille · développeur full-stack'
    },
    gift: {
      category: 'Single · Rick Astley',
      open: 'Ouvrir le cadeau',
      summary:
        'Le plus ancien projet de la liste, et le seul que je n’ai pas écrit. Sorti en 1987, toujours en production : il n’a jamais laissé tomber personne. Vous l’avez trouvé, il est à vous.',
      title: 'Never Gonna Give You Up'
    }
  },
  error: {
    api: {
      invalid_content:
        'Ce contenu n’a pas passé ses propres contrôles et ne peut pas s’afficher.',
      not_found: 'Rien à cette adresse.'
    },
    note: 'Recharger la page remet en général tout d’aplomb.',
    reload: 'Recharger la page',
    title: 'Quelque chose a cassé sur cette page.'
  },
  footer: {
    colophon: 'Prérendu, en français et en anglais, clair et sombre.',
    keeper: '© {year} Adrien Lacourpaille, à Nantes.',
    source: 'Code source du site'
  },
  header: {
    about: 'À propos',
    contact: 'Contact',
    cv: 'CV',
    home: 'Adrien Lacourpaille, page d’accueil',
    menu: 'Menu',
    name: 'Adrien Lacourpaille',
    navigation: 'Principale',
    projects: 'Projets',
    skip: 'Aller au contenu'
  },
  home: {
    about: {
      more: 'Tout le parcours',
      off: 'Hors du clavier : le cinéma, et le tennis de table.',
      path: 'Je ne suis pas entré par une école. J’ai passé des années en logistique, entre une réserve et un supermarché à 5 h du matin, avant une formation à distance en 2021.',
      title: 'À propos',
      work: 'Depuis 2023, je suis le seul développeur d’une plateforme multi-écrans en production. Je tiens à une architecture saine, des monorepos aux API typées de bout en bout, à l’accessibilité et aux tests, et je garde mes projets sur les dernières versions de leur écosystème.'
    },
    hero: {
      lead: 'Le jour, je suis le seul développeur d’une plateforme multi-écrans en production. Le soir, je construis des apps nées d’un vrai besoin.',
      openToWork: 'Ouvert aux offres',
      photo: 'Portrait d’Adrien Lacourpaille',
      place: 'Nantes',
      role: 'Développeur full-stack'
    },
    index: {
      detail: 'Tout le détail',
      intro:
        'Chacun résout un problème différent : du temps réel, du hors ligne, des données publiques. Ouvrez-en un pour le détail.',
      live: 'Voir en ligne',
      play: 'Jouer en ligne',
      source: 'Code source',
      title: 'Projets'
    },
    mechanisms: {
      analytics: 'quatre apps envoient, un Worker écrit une ligne',
      onRecord: 'pas de serveur, un job de nuit demande ce qui a changé',
      scoreboard: 'un journal par événement, chaque écran le rejoue',
      seance: 'zéro serveur, tout en cache sur l’appareil',
      taverla: 'un serveur, un socket vers chaque écran'
    },
    shelf: {
      documentation: 'La documentation',
      hint: 'Survolez un paquet pour lire ce qu’il fait.',
      lead: '{count} petits paquets TypeScript publiés sur npm, chacun sorti d’un projet dès qu’un deuxième en avait besoin. Chaque app ci-dessus les installe, jusqu’à ses réglages de compilateur et de linter :',
      source: 'Code source',
      title: 'Les paquets dessous'
    },
    title: 'Adrien Lacourpaille'
  },
  invite: {
    cvAts: 'CV · ATS',
    cvPdf: 'CV · PDF',
    note: 'Je cherche mon prochain poste. Écrivez-moi, ou prenez le CV : un mis en page, et un sobre pour les logiciels de recrutement.',
    titleAccent: 'peut-être ?',
    titleBefore: 'Votre équipe,',
    write: 'M’écrire'
  },
  locale: {
    label: 'Langue'
  },
  notFound: {
    address: 'Adresse demandée : {path}',
    backHome: 'Retour à l’accueil',
    note: 'Cette page n’existe pas, ou plus. Le lien est peut-être ancien, ou mal tapé.',
    title: 'Page introuvable'
  },
  project: {
    breadcrumb: 'Projets',
    code: 'Code : {title}',
    coverage: 'Couverture',
    coverageNote: 'lignes exécutées par {scope}, lues le {date}',
    coverageValue: '{percent} %',
    documentation: 'Documentation',
    excerpts: 'Tel que le compilateur le lit',
    excerptsLead:
      'Mis en page comme dans un éditeur : une ligne ondulée est un build qui refuse, une ligne violette est ce que le compilateur déduit tout seul.',
    figures: 'En chiffres',
    highlights: 'En bref',
    housePackages: 'Paquets maison',
    housePackagesCount: '{count} sur {total}',
    housePackagesNote: 'installés depuis npm',
    installs: 'Paquets maison',
    installsLead:
      '{count} des {total} paquets maison, depuis npm, jusqu’aux réglages du compilateur et du linter.',
    live: 'Voir en ligne',
    mechanism: 'Comment ça marche',
    neighbours: 'Autres projets',
    next: 'Projet suivant',
    packages: {
      count: 'Paquets',
      countNote: 'sous @adrienlcp',
      installedBy: 'Installés par',
      installedByCount: '{count} projets',
      kind: 'Bibliothèque · TypeScript · npm',
      latest: 'Dernière version',
      latestNote: 'sur npm, avec provenance',
      table: 'Les {count}',
      tableLead:
        'Chacun à sa version sur npm, et les projets qui l’installent.',
      thisSite: 'ce site',
      toTable: 'Les {count} paquets',
      usedBy: 'Utilisé par',
      usedByAll: 'tous les projets',
      usedByAllBut: 'tous sauf {missing}'
    },
    play: 'Jouer en ligne',
    previous: 'Projet précédent',
    refusal: 'Refusé par le compilateur',
    result: 'Déduit par le compilateur',
    source: 'Code source',
    stack: 'Stack technique',
    verdict: {
      compiles: 'Compile',
      errors: '{count} erreurs',
      label: '{verdict} : {errors}',
      noErrors: '0 erreur',
      oneError: '1 erreur',
      refused: 'Refusé'
    }
  },
  theme: {
    dark: 'Sombre',
    label: 'Thème',
    light: 'Clair',
    system: 'Auto'
  },
  ui: {
    close: 'Fermer',
    newTab: '(s’ouvre dans un nouvel onglet)'
  }
})
