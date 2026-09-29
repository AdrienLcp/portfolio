import type { z } from 'zod'

import type { projectsSchema } from '@/features/projects/domain/project'

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
  }
]
