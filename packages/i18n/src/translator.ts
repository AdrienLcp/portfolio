import type {
  DefinedTranslation,
  PluralForms,
  RelativeTime,
  TranslationOptions
} from './define-translation'
import type {
  Dictionary,
  DictionaryFor,
  DotPath,
  LeafAt,
  ParameterizedKey,
  PlainKey,
  RichValuesFor,
  ValuesFor
} from './dictionary'

export type Translator<Reference> = {
  <Key extends PlainKey<Reference>>(key: Key): string
  <
    Key extends ParameterizedKey<Reference>,
    Values extends ValuesFor<LeafAt<Reference, Key>>
  >(
    key: Key,
    values: Values
  ): string
  rich: <Key extends DotPath<Reference> & string, Node>(
    key: Key,
    values: RichValuesFor<LeafAt<Reference, Key>, Node>
  ) => (string | Node)[]
}

type TranslatorOptions<Reference> = {
  dictionary: Dictionary & DictionaryFor<Reference>
  locale: string
}

export const createTranslator = <Reference>({
  dictionary,
  locale
}: TranslatorOptions<Reference>): Translator<Reference> => {
  const formatters = createTranslatorScopedFormatters(locale)

  function translate<Key extends PlainKey<Reference>>(key: Key): string
  function translate<
    Key extends ParameterizedKey<Reference>,
    Values extends ValuesFor<LeafAt<Reference, Key>>
  >(key: Key, values: Values): string
  function translate(key: string, values?: Record<string, unknown>): string {
    const translation = findLeaf(dictionary, key)

    if (translation === undefined) {
      return key
    }

    if (typeof translation === 'string') {
      return substitute({
        formatters,
        message: translation,
        options: {},
        values: values ?? {}
      })
    }

    const [message, options] = translation

    return substitute({ formatters, message, options, values: values ?? {} })
  }

  const rich = <Node>(
    key: string,
    values: Record<string, unknown>
  ): (string | Node)[] => {
    const translation = findLeaf(dictionary, key)

    if (translation === undefined) {
      return [key]
    }

    const [message, options] =
      typeof translation === 'string'
        ? ([translation, {}] as const)
        : translation

    const spansCutBeforeSubstitution = splitSpansWithoutNesting(message)

    return spansCutBeforeSubstitution.map((span) => {
      const text = substitute({
        formatters,
        message: span.text,
        options,
        values
      })

      if (span.tag === undefined) {
        return text
      }

      const render = values[span.tag]

      return typeof render === 'function' ? render(text) : text
    })
  }

  return Object.assign(translate, { rich })
}

const SPAN = /<(\w+)>([\s\S]*?)<\/\1>/g

type Span = { tag: string | undefined; text: string }

const splitSpansWithoutNesting = (message: string): Span[] => {
  const spans: Span[] = []
  let cursor = 0

  for (const match of message.matchAll(SPAN)) {
    const [whole, tag, children] = match

    if (tag === undefined || children === undefined) {
      continue
    }

    const before = message.slice(cursor, match.index)

    if (before !== '') {
      spans.push({ tag: undefined, text: before })
    }

    spans.push({ tag, text: children })
    cursor = match.index + whole.length
  }

  const tail = message.slice(cursor)

  if (tail !== '' || spans.length === 0) {
    spans.push({ tag: undefined, text: tail })
  }

  return spans
}

const isLeaf = (
  branch: string | DefinedTranslation | Dictionary
): branch is string | DefinedTranslation =>
  typeof branch === 'string' || Array.isArray(branch)

const findLeaf = (
  dictionary: Dictionary,
  key: string
): string | DefinedTranslation | undefined => {
  let branch: string | DefinedTranslation | Dictionary | undefined = dictionary

  for (const segment of key.split('.')) {
    if (branch === undefined || isLeaf(branch)) {
      return undefined
    }

    branch = branch[segment]
  }

  return branch !== undefined && isLeaf(branch) ? branch : undefined
}

const PLACEHOLDER = /\{(\w+)(?::(\w+))?\}/g

const FORMATTED_COUNT = '{?}'

const substitute = ({
  expanding = [],
  formatters,
  message,
  options,
  values
}: {
  expanding?: readonly string[]
  formatters: Formatters
  message: string
  options: TranslationOptions
  values: Record<string, unknown>
}): string =>
  message.replace(PLACEHOLDER, (placeholder, name: string, type?: string) => {
    const value = values[name]

    if (value === undefined) {
      return placeholder
    }

    switch (type) {
      case 'date':
        return value instanceof Date
          ? formatters.date(options.date?.[name]).format(value)
          : placeholder
      case 'displayname':
        return typeof value === 'string'
          ? (displayName({
              formatters,
              of: value,
              options: options.displayname?.[name]
            }) ?? placeholder)
          : placeholder
      case 'enum': {
        const member =
          typeof value === 'string' ? options.enum?.[name]?.[value] : undefined

        return member === undefined
          ? placeholder
          : expand({
              expanding,
              formatters,
              message: member,
              name,
              options,
              placeholder,
              values
            })
      }
      case 'list':
        return Array.isArray(value)
          ? formatters.list(options.list?.[name]).format(value)
          : placeholder
      case 'number':
        return typeof value === 'number'
          ? formatters.number(options.number?.[name]).format(value)
          : placeholder
      case 'plural':
        return typeof value === 'number'
          ? expand({
              expanding,
              formatters,
              message: pluralize({
                count: value,
                formatters,
                forms: options.plural?.[name]
              }),
              name,
              options,
              placeholder,
              values
            })
          : placeholder
      case 'relative':
        return typeof value === 'number'
          ? (relativeTime({
              count: value,
              formatters,
              unit: options.relative?.[name]
            }) ?? placeholder)
          : placeholder
      default:
        return String(value)
    }
  })

const expand = ({
  expanding,
  formatters,
  message,
  name,
  options,
  placeholder,
  values
}: {
  expanding: readonly string[]
  formatters: Formatters
  message: string
  name: string
  options: TranslationOptions
  placeholder: string
  values: Record<string, unknown>
}): string =>
  expanding.includes(name)
    ? placeholder
    : substitute({
        expanding: [...expanding, name],
        formatters,
        message,
        options,
        values
      })

const pluralize = ({
  count,
  formatters,
  forms
}: {
  count: number
  formatters: Formatters
  forms: PluralForms | undefined
}): string => {
  if (forms === undefined) {
    return String(count)
  }

  const optsIntoZeroForm = count === 0 && forms.zero !== undefined
  const category = optsIntoZeroForm
    ? 'zero'
    : formatters.plural({ type: forms.type }).select(count)

  return (forms[category] ?? forms.other).replaceAll(
    FORMATTED_COUNT,
    formatters.number(forms.formatter).format(count)
  )
}

const displayName = ({
  formatters,
  of,
  options
}: {
  formatters: Formatters
  of: string
  options: Intl.DisplayNamesOptions | undefined
}): string | undefined =>
  options === undefined ? undefined : formatters.displayname(options).of(of)

const relativeTime = ({
  count,
  formatters,
  unit
}: {
  count: number
  formatters: Formatters
  unit: RelativeTime | undefined
}): string | undefined =>
  unit === undefined
    ? undefined
    : formatters.relative(unit).format(count, unit.unit)

type Formatters = {
  date: (options?: Intl.DateTimeFormatOptions) => Intl.DateTimeFormat
  displayname: (options: Intl.DisplayNamesOptions) => Intl.DisplayNames
  list: (options?: Intl.ListFormatOptions) => Intl.ListFormat
  number: (options?: Intl.NumberFormatOptions) => Intl.NumberFormat
  plural: (options?: Intl.PluralRulesOptions) => Intl.PluralRules
  relative: (
    options?: Intl.RelativeTimeFormatOptions
  ) => Intl.RelativeTimeFormat
}

const createTranslatorScopedFormatters = (locale: string): Formatters => {
  const dates = new Map<string, Intl.DateTimeFormat>()
  const displayNames = new Map<string, Intl.DisplayNames>()
  const lists = new Map<string, Intl.ListFormat>()
  const numbers = new Map<string, Intl.NumberFormat>()
  const plurals = new Map<string, Intl.PluralRules>()
  const relatives = new Map<string, Intl.RelativeTimeFormat>()

  return {
    date: (options) =>
      remembered(
        dates,
        options,
        () => new Intl.DateTimeFormat(locale, options)
      ),
    displayname: (options) =>
      remembered(
        displayNames,
        options,
        () => new Intl.DisplayNames(locale, options)
      ),
    list: (options) =>
      remembered(lists, options, () => new Intl.ListFormat(locale, options)),
    number: (options) =>
      remembered(
        numbers,
        options,
        () => new Intl.NumberFormat(locale, options)
      ),
    plural: (options) =>
      remembered(plurals, options, () => new Intl.PluralRules(locale, options)),
    relative: (options) =>
      remembered(
        relatives,
        options,
        () => new Intl.RelativeTimeFormat(locale, options)
      )
  }
}

const remembered = <Formatter>(
  cache: Map<string, Formatter>,
  options: unknown,
  build: () => Formatter
): Formatter => {
  const key = JSON.stringify(options ?? null)
  const built = cache.get(key)

  if (built !== undefined) {
    return built
  }

  const created = build()
  cache.set(key, created)

  return created
}
