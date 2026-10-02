import { defineDictionary } from '@adrienlcp/i18n'

export const FR_DICTIONARY = defineDictionary({
  about: {
    after: {
      bridge:
        'Les soirées vont toujours au code. Chaque appli du registre est née d’un vrai besoin, et a été livrée finie.',
      firstEntry: 'Première ligne',
      off: 'Hors du clavier : le cinéma, et le tennis de table.',
      title: 'Où passent les soirées',
      wholeRegister: 'Tout le registre'
    },
    lead: 'Je ne suis pas entré par une école. Je suis entré par une réserve, un supermarché à 5 h du matin et une formation à distance,',
    leadSoft:
      'et tout le chemin est ci-dessous, une ligne par étape, comme le registre tient tout le reste.',
    path: {
      count: '{count} étapes, la plus ancienne d’abord',
      happened: 'Ce qui s’est passé',
      narrow: 'Le chemin',
      state: 'État',
      step: 'Étape',
      title: 'Le chemin, de la plus ancienne étape à la plus récente',
      when: 'Quand'
    },
    plate: 'Adrien',
    state: {
      closed: 'Clos',
      current: 'En cours',
      currentSince: 'En cours, depuis {date}',
      paused: 'En pause',
      since: 'depuis {date}'
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
      lookingBefore: 'Je cherche l’équipe avec qui livrer la suite. Le',
      role: 'Développeur full-stack, basé à Couëron, à côté de Nantes.'
    },
    title: 'Contact',
    write: 'Écrire un e-mail'
  },
  cv: {
    download: 'Télécharger le CV',
    downloadPlain: 'Version ATS',
    email: 'E-mail',
    labelSeparator: ' : ',
    location: 'Localisation',
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
  error: {
    api: {
      invalid_content:
        'Ce contenu n’a pas passé ses propres contrôles et ne peut pas s’afficher.',
      not_found: 'Rien à cette adresse.'
    },
    note: 'Recharger la page remet en général tout d’aplomb.',
    reload: 'Recharger la page',
    stamp: 'Coquille',
    title: 'Quelque chose a cassé sur cette page.'
  },
  footer: {
    colophon:
      '{year}. Composé en Sofia Sans ; chaque écran est dessiné, pas capturé.',
    keeper: 'Adrien Lacourpaille · Nantes'
  },
  header: {
    about: 'À propos',
    contact: 'Contact',
    cv: 'CV',
    home: 'Adrien Lacourpaille, page d’accueil',
    menu: 'Menu',
    name: 'Adrien Lacourpaille',
    navigation: 'Principale',
    register: 'Registre',
    skip: 'Aller au contenu'
  },
  home: {
    about: {
      after:
        'd’une plateforme multi-écrans en production. Je tiens à une architecture saine, des monorepos aux API typées de bout en bout, à l’accessibilité et aux tests, et je garde mes projets sur les dernières versions de leur écosystème.',
      before: 'Depuis 2023, je suis au travail le',
      emphasis: 'seul développeur',
      title: 'À propos'
    },
    entry: {
      close: 'Refermer l’entrée',
      countsFrom: 'Compte les visites de',
      drawn: 'Dessiné pour ce registre, pas une capture',
      entered: 'Inscrit',
      full: 'Entrée complète',
      installs: 'Installe',
      installsAll: 'les {total} paquets maison',
      installsAllBut: '{count} paquets maison, tous sauf {missing}',
      installsSome: '{count} paquets maison',
      mechanism: 'Mécanisme',
      open: 'Ouvrir l’entrée',
      openApp: 'Ouvrir en ligne',
      openGame: 'Jouer en ligne',
      pageViewsTo: 'Envoie ses visites à',
      shipped: 'Ce qui est livré',
      source: 'Code source'
    },
    head: {
      inProgress: 'en cours',
      keptSince: 'Tenu depuis le',
      lastEntry: 'Dernière entrée',
      lead: 'Ce que je code le soir, une fois la journée finie, une ligne datée par projet :',
      leadAfter: 'Je cherche mon prochain poste.',
      leadSoft: 'les apps d’abord, puis les paquets qu’elles partagent.',
      openToWork: 'Ouvert aux offres',
      packages: 'paquets',
      place: 'Nantes',
      released: 'apps publiées',
      role: 'Développeur full-stack'
    },
    mechanisms: {
      analytics: 'trois apps envoient, un Worker écrit une ligne',
      onRecord: 'pas de serveur, un job de nuit demande ce qui a changé',
      seance: 'zéro serveur, tout en cache sur l’appareil',
      taverla: 'un serveur, un socket vers chaque écran'
    },
    next: {
      cvAts: 'CV · ATS',
      cvPdf: 'CV · PDF',
      line: 'Votre équipe,',
      note: 'Je cherche mon prochain poste. Écrivez-moi, ou prenez le CV : un mis en page, et un sobre pour les logiciels de recrutement.',
      title: 'Prochaine entrée',
      write: 'M’écrire'
    },
    packages: {
      cap: '{count} paquets publiés sur npm, avec provenance',
      open: 'Ouvrir l’entrée des paquets',
      package: 'Paquet',
      unused: 'Pas utilisé par {app}',
      used: 'Utilisé par {app}',
      usedBy: 'utilisé par',
      usedByAll: 'Les {count} apps',
      usedByAllBut: 'Toutes sauf {missing}',
      version: 'Version'
    },
    register: {
      app: 'App',
      apps: 'Apps',
      appsThenPackages: '{apps} apps, puis {packages} paquets',
      date: 'Date',
      drawing: 'Dessin',
      packagesBelow: 'paquets plus bas',
      state: 'État',
      title: 'Registre des sorties, les apps puis les paquets'
    },
    site: {
      category: 'Ce site · en cours',
      hosting: 'Hébergement',
      hostingValue: 'Cloudflare Pages',
      lighthouse: 'Lighthouse',
      lighthouseValue: 'Vérifié en CI',
      locales: 'Langues',
      name: 'adrienlacourpaille.dev',
      opened: 'Ouvert',
      short: 'Site',
      summary:
        'Le registre que vous lisez. React 19, prérendu par langue, en anglais et en français, clair et sombre sans flash, des primitives accessibles signées react-aria, et un score Lighthouse vérifié en CI.',
      title: 'Ce site'
    },
    state: {
      inProgress: 'En cours',
      live: 'En ligne',
      shipped: 'Livré',
      stamp: '{state}, inscrit le {date}'
    },
    title: 'Adrien Lacourpaille'
  },
  locale: {
    label: 'Langue'
  },
  notFound: {
    address: 'Adresse demandée : {path}',
    backHome: 'Retour au registre',
    note: 'Le registre n’a aucune entrée à cette adresse. Le lien est peut-être ancien, ou mal tapé.',
    stamp: 'Aucune entrée',
    title: 'Absent du registre'
  },
  project: {
    above: 'Au-dessus dans le registre',
    below: 'En dessous dans le registre',
    breadcrumb: 'Registre',
    code: 'Code : {title}',
    commits: 'Commits',
    commitsNote: 'sur main, lus le {date}',
    coverage: 'Couverture',
    coverageNote: 'lignes exécutées par {scope}, lues le {date}',
    coverageValue: '{percent} %',
    entered: 'Inscrit',
    excerpts: 'Tel que le compilateur le lit',
    excerptsLead:
      'Mis en page comme dans un éditeur : une ligne ondulée est un build qui refuse, une ligne violette est ce que le compilateur déduit tout seul.',
    facts: 'Faits de l’entrée',
    firstCommit: 'Premier commit',
    history: 'Historique',
    historyLead:
      'Tiré du git log, abrégé, et laissé dans sa langue : {shown} commits sur {commits}, du plus récent au plus ancien.',
    housePackages: 'Paquets maison',
    housePackagesCount: '{count} sur {total}',
    housePackagesNote: 'installés depuis npm',
    installs: 'Installe',
    installsLead:
      '{count} des {total} paquets maison, depuis npm, jusqu’aux réglages du compilateur et du linter.',
    mechanism: 'Comment ça marche',
    neighbours: 'Entrées voisines',
    packages: {
      count: 'Paquets',
      countNote: 'sous @adrienlcp',
      installedBy: 'Installés par',
      installedByCount: '{count} apps',
      kind: 'Bibliothèque · TypeScript · npm',
      kindStamp: 'Publié',
      latest: 'Dernière version',
      latestNote: 'sur npm, avec provenance',
      ledger: 'Les {count}',
      ledgerLead: 'Chacun à sa version sur npm, et quelle app l’installe.',
      toLedger: 'Les {count} paquets'
    },
    refusal: 'Refusé par le compilateur',
    result: 'Déduit par le compilateur',
    shipped: 'Ce qui est livré',
    source: 'Code source',
    stack: 'Stack technique',
    state: 'État',
    verdict: {
      compiles: 'Compile',
      errors: '{count} erreurs',
      noErrors: '0 erreur',
      oneError: '1 erreur',
      refused: 'Refusé',
      stamp: '{verdict} : {errors}'
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
