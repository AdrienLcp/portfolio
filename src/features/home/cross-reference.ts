import {
  HOUSE_PACKAGE_NAMES,
  type HousePackageName
} from '@/features/packages/house-package'

/**
 * What the reader points at in the register: one package, lighting every app
 * that installs it, or a set of apps that report to one another.
 */
export type CrossReference =
  | { kind: 'apps'; slugs: readonly string[] }
  | { kind: 'package'; name: HousePackageName }

const PACKAGE_ATTRIBUTE = 'data-package'
const APPS_ATTRIBUTE = 'data-apps'

/** Spread on a chip or a row that stands for one package. */
export const packageReference = (name: HousePackageName) => ({
  [PACKAGE_ATTRIBUTE]: name
})

/** Spread on a chip that ties apps together. */
export const appsReference = (slugs: readonly string[]) => ({
  [APPS_ATTRIBUTE]: slugs.join(' ')
})

const isHousePackageName = (value: string): value is HousePackageName =>
  HOUSE_PACKAGE_NAMES.some((name) => name === value)

export const crossReferenceAt = (
  target: EventTarget | null
): CrossReference | null => {
  if (!(target instanceof Element)) {
    return null
  }

  const holder = target.closest(`[${PACKAGE_ATTRIBUTE}], [${APPS_ATTRIBUTE}]`)
  const name = holder?.getAttribute(PACKAGE_ATTRIBUTE)

  if (name !== null && name !== undefined && isHousePackageName(name)) {
    return { kind: 'package', name }
  }

  const slugs = holder?.getAttribute(APPS_ATTRIBUTE)

  return slugs === null || slugs === undefined
    ? null
    : { kind: 'apps', slugs: slugs.split(' ') }
}

export const isAppLit = ({
  installs,
  reference,
  slug
}: {
  installs: readonly HousePackageName[]
  reference: CrossReference | null
  slug: string
}): boolean => {
  if (reference === null) {
    return false
  }

  return reference.kind === 'package'
    ? installs.includes(reference.name)
    : reference.slugs.includes(slug)
}

export const isPackageLit = (
  reference: CrossReference | null,
  name: HousePackageName
): boolean => reference?.kind === 'package' && reference.name === name
