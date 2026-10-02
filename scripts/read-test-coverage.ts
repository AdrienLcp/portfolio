import { spawnSync } from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'

import { PROJECTS } from '../src/features/projects/projects-content'

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

type CoverageSummary = { total: { lines: { pct: number } } }

const readLineCoverage = async (repositoryDir: string): Promise<number> => {
  const run = spawnSync('pnpm', ['test:coverage'], {
    cwd: repositoryDir,
    shell: true,
    stdio: 'inherit'
  })

  if (run.status !== 0) {
    throw new Error(`pnpm test:coverage failed in ${repositoryDir}`)
  }

  const summary: CoverageSummary = JSON.parse(
    await readFile(
      join(repositoryDir, 'coverage', 'coverage-summary.json'),
      'utf8'
    )
  )

  return summary.total.lines.pct
}

const readOn = new Date().toISOString().slice(0, 10)
const figures: string[] = []

for (const { links, slug } of PROJECTS) {
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
