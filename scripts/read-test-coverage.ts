import { spawnSync } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'

import { runnerImport } from 'vite'
import { z } from 'zod'

import type * as ProjectsContent from '../src/features/projects/projects-content'
import { today } from '../src/infrastructure/clock'
import viteConfig from '../vite.config.ts'
import { highlightedExcerpts } from './highlighted-excerpts.ts'
import { readJsonFile } from './read-json-file'

/** Every project's repository is cloned beside this one, under its own name. */
const REPOSITORIES_DIR = join(import.meta.dirname, '..', '..')

const FIGURES_FILE = join(
  import.meta.dirname,
  '..',
  'src',
  'features',
  'projects',
  'test-coverage-figures.ts'
)

const coverageSummarySchema = z.object({
  total: z.object({ lines: z.object({ pct: z.number() }) })
})

const readLineCoverage = async (repositoryDir: string): Promise<number> => {
  const run = spawnSync('pnpm', ['test:coverage'], {
    cwd: repositoryDir,
    shell: true,
    stdio: 'inherit'
  })

  if (run.status !== 0) {
    throw new Error(`pnpm test:coverage failed in ${repositoryDir}`)
  }

  const summary = await readJsonFile(
    join(repositoryDir, 'coverage', 'coverage-summary.json'),
    coverageSummarySchema
  )

  return summary.total.lines.pct
}

const readOn = today('Europe/Paris').toString()
const figures: string[] = []

/** Through Vite, which turns each code excerpt into highlighted tokens on import. */
const { module: projectsContent } = await runnerImport<typeof ProjectsContent>(
  join(
    import.meta.dirname,
    '..',
    'src',
    'features',
    'projects',
    'projects-content.ts'
  ),
  {
    configFile: false,
    plugins: [highlightedExcerpts()],
    resolve: viteConfig.resolve
  }
)

for (const { links, slug } of projectsContent.PROJECTS) {
  const repositoryDir = join(REPOSITORIES_DIR, basename(links.repository))
  const lines = await readLineCoverage(repositoryDir)

  figures.push(`  '${slug}': { lines: ${lines}, readOn: '${readOn}' }`)
}

await writeFile(
  FIGURES_FILE,
  `/** Written by \`pnpm coverage:read\`, which runs each repository's \`test:coverage\`. */
export const TEST_COVERAGE_FIGURES = {
${figures.join(',\n')}
} as const
`
)

spawnSync('pnpm', ['biome', 'format', '--write', FIGURES_FILE], {
  shell: true,
  stdio: 'inherit'
})
