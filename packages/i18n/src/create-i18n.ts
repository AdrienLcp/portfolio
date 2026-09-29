import type {
  Dictionary,
  DictionaryFor,
  MatchingDictionary
} from './dictionary'
import { negotiateLocale } from './negotiate-locale'
import { createTranslator, type Translator } from './translator'

export type DictionaryLoader<Reference> = () => Promise<{
  default: Localized<Reference>
}>

type Localized<Reference> = Dictionary & DictionaryFor<Reference>

type Registered<Reference> = Localized<Reference> | DictionaryLoader<Reference>

type AnyLoader = () => Promise<{ default: Dictionary }>

const isLoader = <Reference>(
  registered: Registered<Reference> | undefined
): registered is DictionaryLoader<Reference> => typeof registered === 'function'

type Matching<Reference, Entry> = Entry extends () => Promise<{
  default: infer Loaded
}>
  ? () => Promise<{ default: MatchingDictionary<Reference, Loaded> }>
  : Localized<Reference> & MatchingDictionary<Reference, Entry>

export type I18n<
  Reference,
  Locale extends string,
  DefaultLocale extends Locale = Locale
> = {
  compare: (
    locale: Locale,
    options?: Intl.CollatorOptions
  ) => (first: string, second: string) => number
  defaultLocale: DefaultLocale
  load: (locale: Locale) => Promise<Translator<Reference>>
  locales: readonly Locale[]
  negotiate: (preferred: readonly string[]) => Locale
  translator: (locale: Locale) => Translator<Reference>
}

export const createI18n = <
  const Entries extends Record<string, Dictionary | AnyLoader>,
  const DefaultLocale extends keyof Entries & string
>({
  defaultLocale,
  dictionaries
}: {
  defaultLocale: DefaultLocale
  dictionaries: Entries & {
    [Locale in keyof Entries]: Matching<Entries[DefaultLocale], Entries[Locale]>
  } & Record<DefaultLocale, Localized<Entries[DefaultLocale]>>
}): I18n<Entries[DefaultLocale], keyof Entries & string, DefaultLocale> => {
  type Locale = keyof Entries & string
  type Reference = Entries[DefaultLocale]

  const locales = localesOf<Locale>(dictionaries)

  const registryWithoutIntersection = new Map<Locale, Registered<Reference>>(
    locales.map((locale) => [locale, dictionaries[locale]])
  )

  const collators = new Map<string, Intl.Collator>()
  const loaded = new Map<Locale, Localized<Reference>>()
  const loading = new Map<Locale, Promise<Translator<Reference>>>()
  const translators = new Map<Locale, Translator<Reference>>()

  for (const [locale, registered] of registryWithoutIntersection) {
    if (!isLoader(registered)) {
      loaded.set(locale, registered)
    }
  }

  const defaultDictionary = dictionaries[defaultLocale]

  const compare = (locale: Locale, options?: Intl.CollatorOptions) => {
    const key = `${locale} ${JSON.stringify(options ?? null)}`
    const built = collators.get(key)

    if (built !== undefined) {
      return built.compare
    }

    const created = new Intl.Collator(locale, options)

    collators.set(key, created)

    return created.compare
  }

  const stableTranslatorFor = (
    locale: Locale,
    dictionary: Localized<Reference>
  ): Translator<Reference> => {
    const built = translators.get(locale)

    if (built !== undefined) {
      return built
    }

    const created = createTranslator<Reference>({ dictionary, locale })

    translators.set(locale, created)

    return created
  }

  const translator = (locale: Locale): Translator<Reference> => {
    const dictionary = loaded.get(locale)

    return dictionary === undefined
      ? stableTranslatorFor(defaultLocale, defaultDictionary)
      : stableTranslatorFor(locale, dictionary)
  }

  const load = (locale: Locale): Promise<Translator<Reference>> => {
    const dictionary = loaded.get(locale)

    if (dictionary !== undefined) {
      return Promise.resolve(stableTranslatorFor(locale, dictionary))
    }

    const inFlight = loading.get(locale)

    if (inFlight !== undefined) {
      return inFlight
    }

    const loader = registryWithoutIntersection.get(locale)

    if (!isLoader(loader)) {
      return Promise.resolve(translator(locale))
    }

    const started = fetchDictionary<Reference>(loader)
      .then((dictionary) => {
        loaded.set(locale, dictionary)

        return stableTranslatorFor(locale, dictionary)
      })
      .finally(() => {
        loading.delete(locale)
      })

    loading.set(locale, started)

    return started
  }

  return {
    compare,
    defaultLocale,
    load,
    locales,
    negotiate: (preferred) =>
      negotiateLocale(preferred, {
        fallback: defaultLocale,
        supported: locales
      }),
    translator
  }
}

const fetchDictionary = <Reference>(
  loader: DictionaryLoader<Reference>
): Promise<Localized<Reference>> => loader().then((module) => module.default)

const localesOf = <Locale extends string>(
  dictionaries: Record<Locale, unknown>
): Locale[] =>
  Object.keys(dictionaries).filter((key): key is Locale => key in dictionaries)
