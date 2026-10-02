const ROMAN_MONTHS = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
  'XI',
  'XII'
] as const

/**
 * The date a rubber stamp prints: day, month in Roman numerals, year
 * ("29 · IX · 2026"), the same in every language.
 */
export const stampDateOf = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-').map(Number)
  const romanMonth = ROMAN_MONTHS[(month ?? 1) - 1] ?? ''

  return `${day} · ${romanMonth} · ${year}`
}

/** ISO dates sort as text, so the first and last entries need no parsing. */
export const registerSpanOf = (
  isoDates: readonly string[]
): { first: string; last: string } | null => {
  const sorted = [...isoDates].sort()
  const first = sorted.at(0)
  const last = sorted.at(-1)

  return first === undefined || last === undefined ? null : { first, last }
}
