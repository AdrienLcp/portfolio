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
        en: 'Released with Changesets and published from GitHub Actions with npm provenance, never from a laptop.',
        fr: 'Versionnés avec Changesets et publiés depuis GitHub Actions avec la provenance npm, jamais depuis un portable.'
      },
      {
        en: 'This site and Taverla both install them from npm.',
        fr: 'Ce site et Taverla les installent tous deux depuis npm.'
      }
    ],
    links: {
      packages: ['@adrienlcp/i18n', '@adrienlcp/result'],
      repository: 'https://github.com/AdrienLcp/packages'
    },
    name: 'Result & i18n',
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
      }
    ],
    slug: 'packages',
    stack: [
      'TypeScript',
      'Intl',
      'Vitest',
      'Biome',
      'Changesets',
      'GitHub Actions'
    ],
    summary: {
      en: 'Two small TypeScript packages with no dependencies, published on npm. One translates, and knows at compile time what each message asks for; the other says whether something worked, without throwing and without null. Both were copied from project to project until they earned a repository of their own.',
      fr: 'Deux petits paquets TypeScript sans dépendance, publiés sur npm. L’un traduit, et sait dès la compilation ce que chaque message attend ; l’autre dit si quelque chose a marché, sans exception et sans null. Tous deux passaient de projet en projet par copie, jusqu’à mériter un dépôt à eux.'
    },
    tagline: {
      en: 'The two packages under this site and Taverla, typed as far as the compiler goes.',
      fr: 'Les deux paquets sous ce site et sous Taverla, typés aussi loin que va le compilateur.'
    }
  }
]
