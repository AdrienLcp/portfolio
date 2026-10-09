import type { ProjectText } from '@/features/projects/project'

import type { PROJECTS_TEXT_EN } from './projects-content-en'

/** The French words of every project, by slug. */
export const PROJECTS_TEXT_FR: Record<
  keyof typeof PROJECTS_TEXT_EN,
  ProjectText
> = {
  analytics: {
    coverageScope: 'les tests lancés hors du Worker',
    highlights: [
      'Ni cookie, ni IP, ni user agent, ni empreinte, ni hash stockés : une ligne tient un chemin, un domaine référent, un pays, une langue, un thème et un type d’appareil.',
      'Pas de bandeau de consentement : il n’y a rien à consentir.',
      'Une page vue atteinte depuis une autre page du même site prolonge une visite ; tout le reste en commence une.',
      'tracker.js pèse moins de 1 ko compressé, suit la navigation des applications monopages, et ne tourne jamais sur localhost ni dans un navigateur automatisé.',
      'Ajouter ?analytics=off à une URL arrête de compter ce navigateur.'
    ],
    keyFacts: [
      'Ni cookie, ni IP, ni user agent, ni empreinte stockés.',
      'tracker.js pèse moins de 1 ko compressé et suit la navigation des applications monopages.',
      'Quatre sites envoient leurs visites, un Worker écrit une ligne.'
    ],
    releaseCategory: 'mesure d’audience · tableau de bord public',
    screenshotAlt:
      'Tableau de bord public d’Analytics : pages vues et visites de ce portfolio',
    summary:
      'Hono sur Cloudflare Workers, D1 et les Core Web Vitals, avec un tableau de bord public. Une ligne tient un chemin, un domaine référent, un pays, une langue, un thème et un type d’appareil, et il n’y a pas de bandeau de consentement : il n’y a rien à consentir.',
    tagline:
      'Une mesure d’audience sans cookie, incapable de distinguer deux visiteurs.'
  },
  arbor: {
    coverageScope: 'le cœur généalogique, le Worker et les écrans',
    highlights: [
      'Une personne crée la famille et partage un lien ; chaque proche peut ensuite ajouter quelqu’un, corriger une date, joindre une photo ou noter un mariage depuis son téléphone. Sans compte, sans mot de passe, rien à installer.',
      'De vraies familles, pas un arbre binaire : unions successives et leur fin, adoption et beaux-parents, demi-frères et sœurs, parents inconnus et dates approximatives comme « vers 1880 ».',
      'Chaque modification est une entrée du journal de la famille, signée par qui l’a faite : tout s’annule, une suppression part à la corbeille, et le gardien peut remettre l’arbre tel qu’il était à n’importe quel moment.',
      'L’arbre s’imprime en PDF vectoriel, sur une feuille ou réparti sur plusieurs, avec un QR code vers l’arbre en ligne : on ne le réimprime que si quelqu’un veut du papier.',
      '« Comment sommes-nous parents ? » entre deux personnes, en français simple : « cousin issu de germain », « grand-oncle par alliance ».',
      'Chaque famille est son propre Durable Object avec sa propre base SQLite : un lien de famille n’atteint jamais que ses propres données, et le tout tourne sur l’offre gratuite de Cloudflare.'
    ],
    keyFacts: [
      'Un lien, pas un compte : toute la famille tient le même arbre depuis son téléphone.',
      'Rien ne se perd : chaque modification s’annule, tout état passé se restaure.',
      'S’imprime sur papier, avec un QR code vers l’arbre en ligne.'
    ],
    releaseCategory: 'arbre de famille partagé · par lien, imprimable',
    screenshotAlt:
      'Arbor affichant l’arbre complet d’une famille inventée, cinq générations avec unions, une adoption et des parents inconnus',
    summary:
      'Un arbre généalogique que toute la famille tient à jour ensemble, fait pour un père qui gardait le sien dans un vieux logiciel et le réimprimait à chaque naissance ou séparation. Un lien partagé remplace la réimpression : les proches corrigent l’arbre depuis leur téléphone, chaque modification s’annule, et la version papier s’imprime avec un QR code vers l’arbre en ligne.',
    tagline:
      'L’arbre de famille que toute la famille tient à jour, à partir d’un lien.'
  },
  'on-record': {
    coverageScope: 'les tests de l’ingestion, du site et du protocole',
    highlights: [
      'Chaque scrutin public de chaque député, avec le groupe où il siégeait le jour du vote. Ni classement ni note : chaque chiffre renvoie aux votes qu’il compte, et chaque page cite sa source officielle.',
      'Ni serveur ni base de données : chaque nuit, un job GitHub Actions demande à l’open data de l’Assemblée si quelque chose a changé, ne reconstruit que ce qui a bougé et déploie. Une nuit sans nouveau vote ne télécharge rien et ne déploie rien.',
      'L’hébergeur publie 20 000 fichiers par déploiement, et il y a plus de 8 000 scrutins : ils partent en blocs, un fichier par député, de petits index pour les listes et la recherche, et le build vérifie toute sa sortie contre un budget.',
      'Environ 750 pages prérendues par les loaders mêmes que le navigateur exécute, un faux fetch leur servant les données pendant le build, chacune avec ses propres balises head et sa place dans le sitemap.',
      'Trouver son député depuis sa commune ou son adresse, en français, en clair comme en sombre.'
    ],
    keyFacts: [
      'Ni serveur ni base : un job de nuit demande à l’open data ce qui a changé, et ne reconstruit que ça.',
      'Environ 750 pages prérendues par les loaders mêmes que le navigateur exécute.',
      'Plus de 8 000 scrutins découpés pour tenir dans le budget de fichiers de l’hébergeur.'
    ],
    releaseCategory: 'vie publique · en ligne',
    screenshotAlt:
      'Accueil d’on-record : quels partis ont voté comme vous l’auriez fait',
    summary:
      'Comment votent vraiment les députés, scrutin par scrutin. Chaque vote public de l’Assemblée nationale, expliqué en clair pour qui n’a jamais suivi une séance, chaque chiffre ramené au compte rendu officiel.',
    tagline:
      'Ce que font vraiment les députés, pièces à l’appui, pas ce qu’ils disent.'
  },
  packages: {
    coverageScope: 'les tests de chaque paquet',
    highlights: [
      'Le dictionnaire français est typé contre l’anglais, jusqu’à chaque paramètre : une clé oubliée ou un {nom} écrit à la place de {name} casse le build au lieu de s’afficher à l’écran.',
      'Chaque règle qu’elle impose est une erreur de compilation : ces tests-là s’écrivent en types et c’est tsc qui les vérifie.',
      'browser copie dans le presse-papiers même en HTTP simple, où l’API Clipboard n’existe pas.',
      'Versionnés avec Changesets et publiés depuis GitHub Actions avec la provenance npm, jamais depuis un portable.',
      'Ce site, Taverla, Séance et on-record les installent depuis npm, jusqu’à leurs configs TypeScript et Biome.'
    ],
    keyFacts: [
      'Aucune dépendance tierce à l’exécution.',
      'Publiés depuis GitHub Actions avec la provenance npm, jamais depuis un portable.',
      'Chaque app les installe, jusqu’aux réglages du compilateur et du linter.'
    ],
    sampleNotes: {
      '@adrienlcp/i18n': [
        'Les arguments d’un message se lisent dans le message lui-même : oubliez {name} et l’appel ne compile pas. Ni génération de code, ni plugin de build.'
      ],
      '@adrienlcp/result': [
        'Result tient en trente lignes. Un succès qui ne porte rien n’a pas de clé data du tout : personne n’y lit undefined.'
      ],
      '@adrienlcp/safe-storage': [
        'La fenêtre privée de Safari levait une exception à chaque écriture dans localStorage ; safe-storage y renvoie un Result, comme pour un quota plein ou une valeur rangée par une ancienne version.'
      ],
      '@adrienlcp/theme-preference': [
        'Un téléphone peint sa barre d’outils avec les balises theme-color, qui suivent le système, pas le visiteur. Le paquet de thème réécrit leur media query avant le premier rendu : un choix sombre sur un téléphone clair a aussi sa barre sombre.'
      ]
    },
    screenshotAlt: 'Le site de documentation des paquets',
    summary:
      'Des petits paquets TypeScript sans dépendance tierce à l’exécution, publiés sur npm, chacun sorti d’un projet dès qu’un deuxième en avait besoin. L’un traduit, et sait dès la compilation ce que chaque message attend ; un autre dit si quelque chose a marché, sans exception et sans null ; les suivants gardent le thème choisi sans flash, ôtent les exceptions de localStorage et du presse-papiers, et partagent le reset, l’anneau de focus et les réglages du compilateur et du linter dont part chaque projet.',
    tagline:
      'Les paquets npm sous ce site, sous Taverla, sous Séance et sous on-record, typés aussi loin que va le compilateur.'
  },
  pastime: {
    coverageScope: 'les tests unitaires des moteurs et de l’app',
    highlights: [
      'Quatre jeux dans une seule app : Étoiles, Tuyaux, le solitaire Klondike et Color Dots. Sans pub, sans compte, rien à télécharger après la première visite.',
      'Chaque niveau est généré sur le téléphone et vérifié avant d’être montré : un solveur logique prouve que chaque grille d’Étoiles et de Tuyaux a une seule solution, atteignable sans deviner, et une donne de solitaire ne sort qu’une fois gagnée par un solveur.',
      'Les niveaux de Color Dots se construisent à l’envers depuis le plateau résolu : le chemin du retour est une victoire garantie, rejouée une fois de plus avant que le niveau sorte.',
      'Un puzzle se nomme par son jeu, sa variante et son numéro, et sa graine vient de ce nom : le puzzle du jour est le même sur tous les téléphones, sans serveur pour se mettre d’accord.',
      'Les générateurs tournent dans un Web Worker, et celui qui abandonne repart d’une graine dérivée de la première : un puzzle du jour relancé reste celui de tout le monde.'
    ],
    keyFacts: [
      'Chaque niveau passe par un solveur avant d’être montré : rien à deviner, aucune donne perdue d’avance.',
      'Le puzzle du jour est le même sur tous les téléphones, sans serveur.',
      'Installable et entièrement hors ligne, parties gardées sur l’appareil.'
    ],
    releaseCategory: 'casse-têtes et solitaire · installable, hors ligne',
    screenshotAlt:
      'Pastime sur trois téléphones : le sommaire, une grille de Tuyaux et une donne de solitaire',
    summary:
      'Des petits jeux de réflexion et de cartes en solo, imprimés comme un cahier de jeux, sans les pubs des apps qui les proposent d’habitude. Chaque niveau est généré sur le téléphone et prouvé faisable avant d’être montré, et toute l’app s’installe et marche hors ligne.',
    tagline: 'Un cahier de jeux sans pub, où chaque niveau est prouvé faisable.'
  },
  scoreboard: {
    coverageScope: 'les règles de score, le Worker et les écrans',
    highlights: [
      'Chaque arbitre compte son match depuis l’appareil qu’il a sous la main, et tous les matchs en cours s’affichent sur un seul grand écran au fond de la salle.',
      'Un Durable Object par événement garde la suite ordonnée des points dans son propre stockage SQLite et la diffuse en WebSocket.',
      'Les points comptés hors ligne attendent en file et repartent à la reconnexion, et une erreur s’annule d’un geste.',
      'Score, service et durées se déduisent tous des événements : l’organisateur corrige un score faux ou déplace un match sur une autre table en direct.',
      'Le tennis de table est le premier règlement ; les règles de score se branchent, d’autres sports peuvent suivre.'
    ],
    keyFacts: [
      'Un Durable Object par événement garde la suite des points et la diffuse en WebSocket.',
      'Les points comptés hors ligne attendent en file et repartent à la reconnexion.',
      'Score, service et durées se déduisent tous des événements : on corrige en direct.'
    ],
    releaseCategory: 'score en direct · salle de club',
    screenshotAlt: 'Accueil de Scoreboard : créer ou rejoindre une rencontre',
    summary:
      'Un tableau des scores en direct pour les clubs qui jouent sur plusieurs tables à la fois. Quatre écrans dans le navigateur — le grand écran, la console d’arbitre, la console d’organisation et la vue spectateur — partagent un Durable Object par événement sur l’offre gratuite de Cloudflare, sans rien à installer.',
    tagline:
      'Le score de chaque table sur un seul grand écran, en direct, compté depuis n’importe quel téléphone.'
  },
  seance: {
    coverageScope: 'les tests unitaires de l’app',
    highlights: [
      'Installable et entièrement hors ligne : un service worker Workbox écrit à la main met toute l’app en cache, et chaque route répond réseau coupé, séance en cours comprise.',
      'Des rappels sans serveur : une horloge dans l’app, les Notification Triggers là où ils existent, et le Periodic Background Sync qui lit le planning dans IndexedDB depuis le worker — et l’écran de réglages dit franchement ce que ce navigateur sait faire.',
      'Des graphiques de progression dessinés à la main en SVG et HTML : régularité comptée en semaines, volume par semaine, tour de taille et poids jamais sur un même axe, chacun parcourable par un input range natif invisible et doublé d’un tableau.',
      'Chaque chiffre reste sur l’appareil : une sauvegarde JSON le transporte ailleurs, et un profil spécimen généré à graine montre les graphiques pleins sans jamais toucher aux données du lecteur.',
      'Trente-sept figures animées dessinées à partir d’articulations, pas de tracés : l’interpolation est polaire et chaînée depuis la hanche, pour qu’aucun os ne s’étire en plein mouvement.'
    ],
    keyFacts: [
      'Installable et entièrement hors ligne, avec un service worker écrit à la main.',
      'Des rappels sans serveur, et un écran qui dit franchement ce que ce navigateur sait faire.',
      'Chaque chiffre reste sur l’appareil ; une sauvegarde JSON le transporte ailleurs.'
    ],
    releaseCategory: 'entraînement · installable, hors ligne',
    screenshotAlt: 'Séance : les courbes de progrès d’un profil spécimen',
    summary:
      'Un programme au poids du corps dessiné comme un manuel de gymnastique, une planche par mouvement. Il guide une séance de trente minutes, tient un journal et trace les courbes de progrès — installable, hors ligne, avec des rappels, et chaque chiffre gardé sur l’appareil.',
    tagline:
      'Un manuel d’entraînement qui marche hors ligne et se souvient de tout, sur l’appareil seul.'
  },
  taverla: {
    coverageScope: 'les tests du serveur et des règles du jeu',
    highlights: [
      'Cinq jeux sur la même étagère : blind test, quiz, L’Ardoise, Réflexe et buzzer.',
      'Une salle, un QR code : chacun rejoint depuis le téléphone qu’il a en main.',
      'Le serveur horodate chaque buzz : c’est la main la plus rapide qui gagne, pas l’horloge la plus en avance.',
      'Testé de bout en bout : de vrais sockets contre un vrai serveur, des parcours Playwright sur deux écrans.',
      'En anglais et en français, clair et sombre, sur un téléphone ou un portable.'
    ],
    keyFacts: [
      'Un serveur, un WebSocket vers chaque écran.',
      'Le serveur horodate chaque buzz : la main la plus rapide gagne, pas l’horloge la plus en avance.',
      'Testé de bout en bout : de vrais sockets, des parcours Playwright sur deux écrans.'
    ],
    releaseCategory: 'jeux de soirée · en ligne',
    screenshotAlt:
      'Accueil de Taverla : ouvrir une table, et cinq jeux à choisir',
    summary:
      'Une étagère de jeux de soirée qui partagent une salle, un QR code et des écrans. Un écran mène la partie, les autres jouent sur ce qu’ils ont sous la main, et le premier qui sait remporte la manche.',
    tagline:
      'Des jeux de soirée sur tous les téléphones de la pièce, au même instant.'
  }
}
