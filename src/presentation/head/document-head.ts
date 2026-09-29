import type { localizedPaths } from '@/infrastructure/router/navigation'
import type { Locale } from '@/presentation/i18n/locale'

/**
 * A page served as its own document, one per language, read off the routes: a
 * page added there stops compiling here until both languages can introduce it.
 * A project's head comes from its own content (`projectHead`), and the plain CV
 * is a `noindex` copy of the CV.
 */
export type IndexedPage = Exclude<
  keyof typeof localizedPaths,
  'cvPlain' | 'project'
>

export type PageHead = {
  /** The search snippet, and the line a link unfurls with. */
  description: string
  /** The browser tab, the search result, the unfurl. */
  title: string
}

const SITE_NAME = 'Adrien Lacourpaille'

const titled = (page: string): string => `${page} — ${SITE_NAME}`

/**
 * The one place user-visible copy lives outside the dictionary: it is read by
 * somebody with no page in front of them, so it says who this is where the
 * page itself says what to look at.
 *
 * Read twice: the prerender writes it into each document, and
 * `useIndexedPageTitle` writes the tab after an in-app navigation.
 */
export const PAGE_HEADS: Record<Locale, Record<IndexedPage, PageHead>> = {
  en: {
    about: {
      description:
        'From the Site du Zéro as a teenager to six years in a warehouse, a bootcamp and a full-stack job in Nantes: how Adrien Lacourpaille came to code, and the tools he reaches for.',
      title: titled('About')
    },
    contact: {
      description:
        'A question, an idea, or just saying hello: write to Adrien Lacourpaille, full-stack developer in Nantes.',
      title: titled('Contact')
    },
    cv: {
      description:
        "Adrien Lacourpaille's CV: full-stack developer in Nantes, TypeScript and React. Downloadable as a PDF, in English and in French.",
      title: titled('CV')
    },
    home: {
      description:
        'Adrien Lacourpaille, full-stack developer in Nantes: websites, APIs and party games. Taverla, realtime party games on every phone in the room; Séance, a training app that works offline with no server; and ten TypeScript packages published on npm.',
      title: `${SITE_NAME} — Full-stack developer`
    },
    projects: {
      description:
        'What Adrien Lacourpaille codes in the evening, once the workday is done: Taverla, party games on every phone in the room; Séance, a training manual that works offline; and the npm packages under both.',
      title: titled('Projects')
    }
  },
  fr: {
    about: {
      description:
        'Du Site du Zéro à l’adolescence à six ans en entrepôt, une formation et un poste full-stack à Nantes : comment Adrien Lacourpaille est venu au code, et les outils qu’il utilise.',
      title: titled('À propos')
    },
    contact: {
      description:
        'Une question, une idée, ou juste pour dire bonjour : écrivez à Adrien Lacourpaille, développeur full-stack à Nantes.',
      title: titled('Contact')
    },
    cv: {
      description:
        'Le CV d’Adrien Lacourpaille : développeur full-stack à Nantes, TypeScript et React. Téléchargeable en PDF, en français et en anglais.',
      title: titled('CV')
    },
    home: {
      description:
        'Adrien Lacourpaille, développeur full-stack à Nantes : sites, API et jeux de soirée. Taverla, des jeux de soirée en temps réel sur tous les téléphones de la pièce ; Séance, une app d’entraînement qui marche hors ligne sans serveur ; et dix paquets TypeScript publiés sur npm.',
      title: `${SITE_NAME} — Développeur full-stack`
    },
    projects: {
      description:
        'Ce qu’Adrien Lacourpaille code le soir, une fois la journée finie : Taverla, des jeux de soirée sur tous les téléphones de la pièce ; Séance, un manuel d’entraînement qui marche hors ligne ; et les paquets npm sous les deux.',
      title: titled('Projets')
    }
  }
}

const isIndexedPage = (page: string): page is IndexedPage =>
  page in PAGE_HEADS.en

export const INDEXED_PAGES: IndexedPage[] = Object.keys(PAGE_HEADS.en).filter(
  isIndexedPage
)

export const projectHead = ({
  name,
  summary
}: {
  name: string
  summary: string
}): PageHead => ({ description: summary, title: titled(name) })

export const notFoundTitle = (message: string): string => titled(message)

/** The share image is the same on every page, so its alt text is the site's. */
export const IMAGE_ALTS: Record<Locale, string> = {
  en: "The lid of Adrien Lacourpaille's portfolio: his name in wide marigold letters on a petrol field, over a tomato band.",
  fr: 'Le couvercle du portfolio d’Adrien Lacourpaille : son nom en larges lettres jaune souci sur un fond pétrole, au-dessus d’une bande tomate.'
}
