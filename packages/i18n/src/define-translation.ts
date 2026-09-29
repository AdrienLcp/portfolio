export type PluralForms = Partial<
  Record<Exclude<Intl.LDMLPluralRule, 'other'>, string>
> & {
  formatter?: Intl.NumberFormatOptions
  other: string
  type?: Intl.PluralRuleType
}

export type RelativeTime = Intl.RelativeTimeFormatOptions & {
  unit: Intl.RelativeTimeFormatUnit
}

export type TranslationOptions = {
  date?: Record<string, Intl.DateTimeFormatOptions>
  displayname?: Record<string, Intl.DisplayNamesOptions>
  enum?: Record<string, Record<string, string>>
  list?: Record<string, Intl.ListFormatOptions>
  number?: Record<string, Intl.NumberFormatOptions>
  plural?: Record<string, PluralForms>
  relative?: Record<string, RelativeTime>
}

type OptionsForParam<
  Type extends string,
  Name extends string
> = Type extends 'date'
  ? { date?: { [K in Name]?: Intl.DateTimeFormatOptions } }
  : Type extends 'displayname'
    ? { displayname: { [K in Name]: Intl.DisplayNamesOptions } }
    : Type extends 'enum'
      ? { enum: { [K in Name]: Record<string, string> } }
      : Type extends 'list'
        ? { list?: { [K in Name]?: Intl.ListFormatOptions } }
        : Type extends 'number'
          ? { number?: { [K in Name]?: Intl.NumberFormatOptions } }
          : Type extends 'plural'
            ? { plural: { [K in Name]: PluralForms } }
            : Type extends 'relative'
              ? { relative: { [K in Name]: RelativeTime } }
              : never

export type OptionsFor<Message extends string> =
  Message extends `${string}{${infer Param}}${infer Rest}`
    ? Param extends `${infer Name}:${infer Type}`
      ? OptionsForParam<Type, Name> & OptionsFor<Rest>
      : OptionsFor<Rest>
    : unknown

export type DefinedTranslation = readonly [string, TranslationOptions]

export const defineTranslation = <
  Message extends string,
  const Options extends OptionsFor<Message>
>(
  message: Message,
  options: Options
): readonly [Message, Options] => [message, options]
