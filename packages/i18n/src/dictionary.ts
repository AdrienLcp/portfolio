import type {
  DefinedTranslation,
  OptionsFor,
  PluralForms
} from './define-translation'

export type Dictionary = {
  [segment: string]: string | DefinedTranslation | Dictionary
}

export type WellFormed<Message> = Message extends string
  ? Record<string, never> extends OptionsFor<Message>
    ? Message
    : never
  : Message extends DefinedTranslation
    ? Message
    : Message extends Dictionary
      ? { [Segment in keyof Message]: WellFormed<Message[Segment]> }
      : never

export const defineDictionary = <
  const T extends { [Segment in keyof T]: WellFormed<T[Segment]> }
>(
  dictionary: T
): T => dictionary

export type DictionaryFor<Reference> = {
  [Segment in keyof Reference]: Reference[Segment] extends readonly [
    string,
    infer Options
  ]
    ? readonly [string, LocalizedOptions<Options>]
    : Reference[Segment] extends string
      ? string
      : Reference[Segment] extends Dictionary
        ? DictionaryFor<Reference[Segment]>
        : never
}

type LocalizedOptions<Options> = {
  [K in keyof Options]: K extends 'plural'
    ? { [Name in keyof Options[K]]: PluralForms }
    : K extends 'enum'
      ? {
          [Name in keyof Options[K]]: Record<
            keyof Options[K][Name] & string,
            string
          >
        }
      : Options[K]
}

export type MatchingDictionary<Reference, Candidate> = {
  [Segment in keyof Reference]: MatchingLeaf<
    Reference[Segment],
    Segment extends keyof Candidate ? Candidate[Segment] : never
  >
} & KeysTheReferenceLacksRefused<Reference, Candidate>

type KeysTheReferenceLacksRefused<Reference, Candidate> = {
  [Segment in Exclude<keyof Candidate, keyof Reference>]: never
}

type MatchingLeaf<Reference, Candidate> = Reference extends readonly [
  string,
  infer Options
]
  ? Matches<Reference, Candidate> extends true
    ? readonly [string, LocalizedOptions<Options>]
    : never
  : Reference extends string
    ? Matches<Reference, Candidate> extends true
      ? string
      : never
    : Reference extends Dictionary
      ? MatchingDictionary<Reference, Candidate>
      : never

type Matches<Reference, Candidate> = Same<
  RichValuesFor<Reference, unknown>,
  RichValuesFor<Candidate, unknown>
>

type Same<Left, Right> = [Left] extends [Right]
  ? [Right] extends [Left]
    ? true
    : false
  : false

type Join<Segment, Rest> = Segment extends string
  ? Rest extends string
    ? `${Segment}.${Rest}`
    : never
  : never

type MaxPathDepth = 10

type NextLevel = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type DotPath<T, Remaining extends Level = MaxPathDepth> = {
  [Segment in keyof T]: T[Segment] extends string | DefinedTranslation
    ? Segment
    : NextLevel[Remaining] extends Level
      ? Join<Segment, DotPath<T[Segment], NextLevel[Remaining]>>
      : never
}[keyof T]

export type LeafAt<T, Path> = Path extends `${infer Segment}.${infer Rest}`
  ? Segment extends keyof T
    ? LeafAt<T[Segment], Rest>
    : never
  : Path extends keyof T
    ? T[Path]
    : never

type MessageOf<Translation> = Translation extends readonly [
  infer Message extends string,
  unknown
]
  ? Message
  : Translation extends string
    ? Translation
    : never

type OptionsOf<Translation> = Translation extends readonly [
  string,
  infer Options
]
  ? Options
  : unknown

type EnumsOf<Options> = Options extends { enum: infer Enums }
  ? Enums
  : Record<string, Record<string, string>>

type ValueForParam<
  Type extends string,
  Name extends string,
  Enums
> = Type extends 'date'
  ? Date
  : Type extends 'displayname'
    ? string
    : Type extends 'enum'
      ? Name extends keyof Enums
        ? keyof Enums[Name]
        : never
      : Type extends 'list'
        ? readonly string[]
        : Type extends 'number' | 'plural' | 'relative'
          ? number
          : never

type FormattedCountMarker = '?'

type ParamsIn<Message extends string> =
  Message extends `${string}{${infer Param}}${infer Rest}`
    ? (Param extends FormattedCountMarker ? never : Param) | ParamsIn<Rest>
    : never

type AlternativesIn<Options> =
  | (Options extends { enum: infer Enums } ? TextsIn<Enums> : never)
  | (Options extends { plural: infer Plurals } ? TextsIn<Plurals> : never)

type TextsIn<Groups> = {
  [Name in keyof Groups]: Groups[Name][keyof Groups[Name]]
}[keyof Groups] &
  string

type ValuesForParams<Params extends string, Enums> = [Params] extends [never]
  ? unknown
  : {
      [Param in Params as Param extends `${infer Name}:${string}`
        ? Name
        : Param]: Param extends `${infer Name}:${infer Type}`
        ? ValueForParam<Type, Name, Enums>
        : string
    }

export type ValuesFor<Translation> = ValuesForParams<
  | ParamsIn<MessageOf<Translation>>
  | ParamsIn<AlternativesIn<OptionsOf<Translation>>>,
  EnumsOf<OptionsOf<Translation>>
>

type TagsIn<Message extends string> =
  Message extends `${string}<${infer Tag}>${infer Rest}`
    ? Tag extends `/${string}`
      ? TagsIn<Rest>
      : Tag | TagsIn<Rest>
    : never

export type RichValuesFor<Translation, Node> = ValuesFor<Translation> & {
  [Tag in TagsIn<MessageOf<Translation>>]: (children: string) => Node
}

export type PlainKey<T> = {
  [Path in DotPath<T>]: keyof ValuesFor<LeafAt<T, Path>> extends never
    ? Path
    : never
}[DotPath<T>]

export type ParameterizedKey<T> = {
  [Path in DotPath<T>]: keyof ValuesFor<LeafAt<T, Path>> extends never
    ? never
    : Path
}[DotPath<T>]
