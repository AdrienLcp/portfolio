import type { z } from 'zod'

import type { projectsSchema } from '@/features/projects/project'

export const PROJECTS: z.input<typeof projectsSchema> = [
  {
    highlights: [
      {
        en: 'Three games on one shelf: blind test, buzzer and quiz.',
        fr: 'Trois jeux sur la même étagère : blind test, buzzer et quiz.'
      },
      {
        en: 'One room, one QR code: everyone joins from the phone they already hold.',
        fr: 'Une salle, un QR code : chacun rejoint depuis le téléphone qu’il a en main.'
      },
      {
        en: 'The server stamps every buzz, so the fastest hand wins, not the fastest clock.',
        fr: 'Le serveur horodate chaque buzz : c’est la main la plus rapide qui gagne, pas l’horloge la plus en avance.'
      },
      {
        en: 'Tested end to end: real sockets against a real server, Playwright journeys across two screens.',
        fr: 'Testé de bout en bout : de vrais sockets contre un vrai serveur, des parcours Playwright sur deux écrans.'
      },
      {
        en: 'English and French, light and dark, on a phone or a laptop.',
        fr: 'En anglais et en français, clair et sombre, sur un téléphone ou un portable.'
      }
    ],
    links: {
      live: 'https://taverla.onrender.com/',
      repository: 'https://github.com/AdrienLcp/taverla'
    },
    name: 'Taverla',
    slug: 'taverla',
    stack: ['TypeScript', 'React', 'Hono', 'WebSocket', 'Zod', 'Playwright'],
    summary: {
      en: 'A shelf of party games sharing one room, one QR code and one set of screens. One screen runs the game, everyone else plays on whatever they have to hand, and the first to know it takes the round.',
      fr: 'Une étagère de jeux de soirée qui partagent une salle, un QR code et des écrans. Un écran mène la partie, les autres jouent sur ce qu’ils ont sous la main, et le premier qui sait remporte la manche.'
    },
    tagline: {
      en: 'Party games on every phone in the room, on the same instant.',
      fr: 'Des jeux de soirée sur tous les téléphones de la pièce, au même instant.'
    }
  },
  {
    highlights: [
      {
        en: 'A message’s arguments are read off the message itself: leave out {name} and the call does not compile. No code generation, no build plugin.',
        fr: 'Les arguments d’un message se lisent dans le message lui-même : oubliez {name} et l’appel ne compile pas. Ni génération de code, ni plugin de build.'
      },
      {
        en: 'The French dictionary is typed against the English one, down to each placeholder: a missing key or a {nom} written for {name} fails the build instead of showing on screen.',
        fr: 'Le dictionnaire français est typé contre l’anglais, jusqu’à chaque paramètre : une clé oubliée ou un {nom} écrit à la place de {name} casse le build au lieu de s’afficher à l’écran.'
      },
      {
        en: 'Every rule it enforces is a compile error, so those tests are written as types and checked by tsc.',
        fr: 'Chaque règle qu’elle impose est une erreur de compilation : ces tests-là s’écrivent en types et c’est tsc qui les vérifie.'
      },
      {
        en: 'Result fits in thirty lines. A success that carries nothing has no data key at all, so nobody reads undefined off it.',
        fr: 'Result tient en trente lignes. Un succès qui ne porte rien n’a pas de clé data du tout : personne n’y lit undefined.'
      },
      {
        en: 'A phone paints its toolbar from the theme-color tags, which follow the system, not the visitor. The theme package rewrites their media query before the first paint, so a dark choice on a light phone gets a dark toolbar too.',
        fr: 'Un téléphone peint sa barre d’outils avec les balises theme-color, qui suivent le système, pas le visiteur. Le paquet de thème réécrit leur media query avant le premier rendu : un choix sombre sur un téléphone clair a aussi sa barre sombre.'
      },
      {
        en: 'Safari’s private window once threw on every localStorage write; safe-storage returns a Result there instead, as for a full quota or a value an older version stored. browser copies to the clipboard even over plain HTTP, where the Clipboard API does not exist.',
        fr: 'La fenêtre privée de Safari levait une exception à chaque écriture dans localStorage ; safe-storage y renvoie un Result, comme pour un quota plein ou une valeur rangée par une ancienne version. browser copie dans le presse-papiers même en HTTP simple, où l’API Clipboard n’existe pas.'
      },
      {
        en: 'Released with Changesets and published from GitHub Actions with npm provenance, never from a laptop.',
        fr: 'Versionnés avec Changesets et publiés depuis GitHub Actions avec la provenance npm, jamais depuis un portable.'
      },
      {
        en: 'This site, Taverla and Séance all install the six from npm.',
        fr: 'Ce site, Taverla et Séance installent tous les trois les six depuis npm.'
      }
    ],
    links: {
      packages: [
        '@adrienlcp/i18n',
        '@adrienlcp/result',
        '@adrienlcp/theme-preference',
        '@adrienlcp/safe-storage',
        '@adrienlcp/browser',
        '@adrienlcp/react'
      ],
      repository: 'https://github.com/AdrienLcp/packages'
    },
    name: 'Packages',
    samples: [
      {
        code: `const EN = defineDictionary({ greeting: 'Hello {name}' })

translate('greeting', { name: 'Ada' })

translate('greeting')
// ✗ Expected 2 arguments, but got 1

translate('greeting', { nom: 'Ada' })
// ✗ 'nom' does not exist in type '{ name: string }'

translate('greting', { name: 'Ada' })
// ✗ not assignable to '"greeting"'`,
        title: '@adrienlcp/i18n'
      },
      {
        code: `const parse = (input: string): Result<number, 'not_a_number'> => {
  const value = Number(input)
  return Number.isNaN(value)
    ? Result.failure('not_a_number')
    : Result.success(value)
}

const result = parse(raw)
if (result.status === 'failure') return result.error
// 'not_a_number'
result.data
// number`,
        title: '@adrienlcp/result'
      },
      {
        code: `export const themeStore = createThemePreferenceStore({
  storageKey: 'app:theme'
})

// vite.config.ts: runs before the first paint
plugins: [themePreferencePlugin(themeStore)]

themeStore.setPreference('dark')
// <html data-theme="dark">
// dark theme-color  → media="all"
// light theme-color → media="not all"`,
        title: '@adrienlcp/theme-preference'
      },
      {
        code: `const locale = readRecognizedText({
  key: 'app:locale',
  isRecognized: isLocale
})

if (locale.status === 'failure') {
  locale.error
  // 'unavailable' | 'unrecognized'
} else {
  locale.data
  // 'en' | 'fr' | null
}`,
        title: '@adrienlcp/safe-storage'
      }
    ],
    slug: 'packages',
    stack: [
      'TypeScript',
      'React',
      'Intl',
      'Vitest',
      'Biome',
      'Changesets',
      'GitHub Actions'
    ],
    summary: {
      en: 'Small TypeScript packages with no third-party dependency, published on npm, each lifted out of a project once a second one needed it. One translates, and knows at compile time what each message asks for; one says whether something worked, without throwing and without null; the others keep the chosen theme from flashing, and take the throw out of localStorage and the clipboard.',
      fr: 'Des petits paquets TypeScript sans dépendance tierce, publiés sur npm, chacun sorti d’un projet dès qu’un deuxième en avait besoin. L’un traduit, et sait dès la compilation ce que chaque message attend ; un autre dit si quelque chose a marché, sans exception et sans null ; les suivants gardent le thème choisi sans flash, et ôtent les exceptions de localStorage et du presse-papiers.'
    },
    tagline: {
      en: 'The npm packages under this site, Taverla and Séance, typed as far as the compiler goes.',
      fr: 'Les paquets npm sous ce site, sous Taverla et sous Séance, typés aussi loin que va le compilateur.'
    }
  },
  {
    highlights: [
      {
        en: 'Installable and fully offline: a hand-written Workbox service worker precaches the whole shell, and every route is served with the network cut, mid-session included.',
        fr: 'Installable et entièrement hors ligne : un service worker Workbox écrit à la main met toute l’app en cache, et chaque route répond réseau coupé, séance en cours comprise.'
      },
      {
        en: 'Reminders without a server: an in-app clock, Notification Triggers where they exist, and Periodic Background Sync reading the schedule from IndexedDB in the worker — and the settings screen says plainly what this browser can do.',
        fr: 'Des rappels sans serveur : une horloge dans l’app, les Notification Triggers là où ils existent, et le Periodic Background Sync qui lit le planning dans IndexedDB depuis le worker — et l’écran de réglages dit franchement ce que ce navigateur sait faire.'
      },
      {
        en: 'Progress charts drawn by hand in SVG and HTML: regularity counted in weeks, volume per week, waist and weight never on a shared axis, each walkable with an invisible native range input and backed by a table.',
        fr: 'Des graphiques de progression dessinés à la main en SVG et HTML : régularité comptée en semaines, volume par semaine, tour de taille et poids jamais sur un même axe, chacun parcourable par un input range natif invisible et doublé d’un tableau.'
      },
      {
        en: 'Every number stays on the device: a JSON backup carries it elsewhere, and a seeded specimen profile shows the charts full without ever touching the reader’s own data.',
        fr: 'Chaque chiffre reste sur l’appareil : une sauvegarde JSON le transporte ailleurs, et un profil spécimen généré à graine montre les graphiques pleins sans jamais toucher aux données du lecteur.'
      },
      {
        en: 'Thirty-seven animated figures drawn from joints, not paths: interpolation is polar and chained from the hip, so no bone stretches mid-movement.',
        fr: 'Trente-sept figures animées dessinées à partir d’articulations, pas de tracés : l’interpolation est polaire et chaînée depuis la hanche, pour qu’aucun os ne s’étire en plein mouvement.'
      }
    ],
    links: {
      live: 'https://sport-buk.pages.dev/specimen',
      repository: 'https://github.com/AdrienLcp/sport'
    },
    name: 'Séance',
    samples: [
      {
        code: `export const isReminderOwed = ({
  lastSessionDay, lastShownDay, now, schedule, today
}) =>
  schedule.isEnabled &&
  schedule.days.some((day) => day === now.getDay()) &&
  now.getTime() >= reminderOn(now, schedule.time).getTime() &&
  lastShownDay !== today &&
  lastSessionDay !== today`,
        title: 'reminder-schedule.ts'
      }
    ],
    slug: 'seance',
    stack: ['TypeScript', 'React', 'PWA', 'Workbox', 'IndexedDB', 'Vitest'],
    summary: {
      en: 'A bodyweight training programme drawn as a gymnastics manual, one plate per movement. It guides a thirty-minute session, keeps a journal and draws the progress curves — installable, offline, with reminders, and with every number kept on the device.',
      fr: 'Un programme au poids du corps dessiné comme un manuel de gymnastique, une planche par mouvement. Il guide une séance de trente minutes, tient un journal et trace les courbes de progrès — installable, hors ligne, avec des rappels, et chaque chiffre gardé sur l’appareil.'
    },
    tagline: {
      en: 'A training manual that works offline and remembers everything, on the device alone.',
      fr: 'Un manuel d’entraînement qui marche hors ligne et se souvient de tout, sur l’appareil seul.'
    }
  }
]
