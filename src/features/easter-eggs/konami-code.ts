export const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
] as const

const isStartOfKonamiCode = (keys: readonly string[]): boolean =>
  keys.every((key, index) => key === KONAMI_CODE[index])

/** `B` and `b` are the same key: Caps Lock must not break the code. */
const keyOf = (pressed: string): string =>
  pressed.length === 1 ? pressed.toLowerCase() : pressed

/**
 * How many keys of the code are typed once `pressed` lands after the first
 * `progress` ones. A wrong key keeps whatever still starts the code, so a third
 * ↑ after ↑ ↑ leaves the visitor two keys in, not back at zero.
 */
export const konamiProgressAfter = (
  progress: number,
  pressed: string
): number => {
  const typed = [...KONAMI_CODE.slice(0, progress), keyOf(pressed)]
  const longestStart = typed
    .map((_, start) => typed.slice(start))
    .find(isStartOfKonamiCode)

  return longestStart?.length ?? 0
}

export const isKonamiCodeComplete = (progress: number): boolean =>
  progress === KONAMI_CODE.length
