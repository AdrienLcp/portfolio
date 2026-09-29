export const negotiateLocale = <Locale extends string>(
  preferred: readonly string[],
  { fallback, supported }: { fallback: Locale; supported: readonly Locale[] }
): Locale => {
  const byTag = new Map(
    supported.map((locale) => [locale.toLowerCase(), locale])
  )

  for (const tag of preferred) {
    for (const candidate of tagAndParentTags(tag.toLowerCase())) {
      const exact = byTag.get(candidate)

      if (exact !== undefined) {
        return exact
      }

      const firstDeclaredRegion = supported.find((locale) =>
        locale.toLowerCase().startsWith(`${candidate}-`)
      )

      if (firstDeclaredRegion !== undefined) {
        return firstDeclaredRegion
      }
    }
  }

  return fallback
}

const tagAndParentTags = (tag: string): string[] => {
  const tags: string[] = []
  let current = tag

  while (current !== '') {
    tags.push(current)
    current = current.replace(/-?[^-]+$/, '')
  }

  return tags
}
