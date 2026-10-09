import {
  HOUSE_PACKAGE_NAMES,
  type HousePackageName
} from '@/features/packages/house-package'
import type { AppRelease, Project } from '@/features/projects/project'

/** Every house package, down to the compiler and linter settings. */
export const SITE_INSTALLS: readonly HousePackageName[] = HOUSE_PACKAGE_NAMES

export type ReleasedApp = Project & { release: AppRelease }

export const isReleasedApp = (project: Project): project is ReleasedApp =>
  project.release !== undefined
