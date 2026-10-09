import type { LocalizedText } from '@/features/content/localized-text'
import type { HousePackageName } from '@/features/packages/house-package'
import type { HighlightedExcerpt } from '@/features/projects/code-excerpt'

/** An ISO date, `YYYY-MM-DD`. */
type IsoDate = string

/**
 * An excerpt set the way an editor shows it, titled with what it is taken
 * from. In its `.excerpt.ts` file, a line `// ✗ message` is the compiler
 * refusing the line above it; a line `// → text` is what the compiler infers
 * for the line above, or what that line produces.
 */
export type CodeSample = {
  excerpt: HighlightedExcerpt
  /** What the excerpt proves, printed beside it; empty when it needs no word. */
  notes: string[]
  title: string
}

/**
 * The share of source lines the unit tests run, measured in the project's
 * repository by `pnpm coverage:read`.
 */
export type Coverage = {
  /** A percentage, from 0 to 100. */
  lines: number
  readOn: IsoDate
  /** What the figure measures ("unit tests, server and game rules"). */
  scope: string
}

/** What the project is, which decides how its page talks about it. */
export type ProjectKind = 'app' | 'game' | 'library'

/** Whether the app is a finished release or a service running in public. */
export type ReleaseState = 'live' | 'shipped'

/** What an app's release adds to it: its category, date, installs and state. */
export type AppRelease = {
  /** What sort of app it is, printed after "App ·" ("party games · live"). */
  category: string
  /** The analytics project its page views are sent to, by slug. */
  countedBy?: string
  entered: IsoDate
  installs: HousePackageName[]
  /** Heads the project's column in the package matrix ("Tav."), five characters at most. */
  shortName: string
  state: ReleaseState
}

export type Project = {
  coverage: Coverage
  highlights: string[]
  /** The app's home-screen icon, square and unmasked, from `public/`. */
  icon: string
  /** The three things the home page's index says when the project is opened. */
  keyFacts: string[]
  kind: ProjectKind
  links: {
    /** The reference site that documents what the project ships. */
    documentation?: LocalizedText
    live?: string
    /** npm package names. */
    packages?: string[]
    repository: string
  }
  name: string
  release?: AppRelease
  samples?: CodeSample[]
  /** What the project's screenshot shows, for a reader who cannot see it. */
  screenshotAlt: string
  /** Kebab-case, unique across projects. */
  slug: string
  stack: string[]
  summary: string
  tagline: string
}

/**
 * A project's words in one language, kept apart from its facts so a page
 * downloads its own language only.
 */
export type ProjectText = {
  coverageScope: string
  highlights: string[]
  keyFacts: string[]
  releaseCategory?: string
  /** By the title of the sample they annotate. */
  sampleNotes?: Record<string, string[]>
  screenshotAlt: string
  summary: string
  tagline: string
}

/** What a project is in every language: the project without its words. */
export type ProjectFacts = Omit<
  Project,
  | 'coverage'
  | 'highlights'
  | 'keyFacts'
  | 'release'
  | 'samples'
  | 'screenshotAlt'
  | 'summary'
  | 'tagline'
> & {
  coverage: Omit<Coverage, 'scope'>
  release?: Omit<AppRelease, 'category'>
  samples?: Omit<CodeSample, 'notes'>[]
}

/**
 * Lays a language's words over a project's facts; `undefined` when the words
 * are missing, or miss the category of a released app.
 */
export const projectInLocale = (
  { coverage, release, samples, ...facts }: ProjectFacts,
  text: ProjectText | undefined
): Project | undefined => {
  if (text === undefined) {
    return undefined
  }

  const { releaseCategory } = text

  if (release !== undefined && releaseCategory === undefined) {
    return undefined
  }

  return {
    ...facts,
    coverage: { ...coverage, scope: text.coverageScope },
    highlights: text.highlights,
    keyFacts: text.keyFacts,
    ...(release !== undefined &&
      releaseCategory !== undefined && {
        release: { ...release, category: releaseCategory }
      }),
    ...(samples !== undefined && {
      samples: samples.map((sample) => ({
        ...sample,
        notes: text.sampleNotes?.[sample.title] ?? []
      }))
    }),
    screenshotAlt: text.screenshotAlt,
    summary: text.summary,
    tagline: text.tagline
  }
}

/** The project's screenshot at a given width. */
export const screenshotPathFor = (slug: string, width: 640 | 1280): string =>
  `/images/projects/${slug}-${width}.webp`

export const npmPageFor = (packageName: string): string =>
  `https://www.npmjs.com/package/${packageName}`
