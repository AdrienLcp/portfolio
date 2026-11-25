import { setTimeout as wait } from 'node:timers/promises'

import { HOSTING } from './hosting.ts'
import { exitWithError, printStep, readCommand, runCommand } from './shell.ts'

/**
 * `pnpm ship` — pushes `main`, watches the CI run, then waits for Cloudflare
 * Pages, which builds and deploys the push on its own through the GitHub app.
 * Nothing is built or deployed from this machine.
 */

const SCOPE = 'ship'
const CI_WORKFLOW = 'ci.yml'
/** The check run Cloudflare's GitHub app posts on each commit it builds. */
const PAGES_CHECK = 'Cloudflare Pages'
const RUN_LOOKUP_ATTEMPTS = 15
const RUN_LOOKUP_INTERVAL_MS = 2000
const PAGES_POLL_ATTEMPTS = 90
const PAGES_POLL_INTERVAL_MS = 10_000
const ACTIONS_URL = `https://github.com/${HOSTING.githubRepository}/actions`
const COMMIT_URL = `https://github.com/${HOSTING.githubRepository}/commit`

const read = (command: string) => readCommand(command).stdout

if (read('git branch --show-current') !== 'main') {
  exitWithError(SCOPE, 'only main deploys: switch to main first')
}
if (read('git status --porcelain')) {
  exitWithError(
    SCOPE,
    'the working tree has uncommitted changes: commit or stash them first'
  )
}
if (!runCommand('git fetch --quiet origin main')) {
  exitWithError(SCOPE, 'could not reach origin')
}
if (read('git rev-list --count HEAD..origin/main') !== '0') {
  exitWithError(
    SCOPE,
    'origin/main has commits this checkout lacks: run `git pull --rebase` first'
  )
}
if (read('git rev-list --count origin/main..HEAD') === '0') {
  exitWithError(SCOPE, 'nothing to ship: origin/main already has every commit')
}

const commit = read('git rev-parse HEAD')
if (!runCommand('git push origin main')) {
  exitWithError(SCOPE, 'git push failed, nothing deployed')
}

const findRun = async (attemptsLeft: number): Promise<string> => {
  const { stdout } = readCommand(
    `gh run list -R ${HOSTING.githubRepository} --workflow ${CI_WORKFLOW} --commit ${commit} --json databaseId -q ".[0].databaseId"`
  )
  if (stdout || attemptsLeft <= 1) return stdout
  await wait(RUN_LOOKUP_INTERVAL_MS)

  return findRun(attemptsLeft - 1)
}

const runId = await findRun(RUN_LOOKUP_ATTEMPTS)
if (!runId) {
  printStep(
    SCOPE,
    `pushed; follow CI on ${ACTIONS_URL} and the deploy on ${COMMIT_URL}/${commit}`
  )
  process.exit(0)
}

printStep(SCOPE, `pushed; watching CI run ${runId}`)
if (
  !runCommand(
    `gh run watch ${runId} -R ${HOSTING.githubRepository} --exit-status`
  )
) {
  exitWithError(
    SCOPE,
    `the CI run failed: ${ACTIONS_URL}/runs/${runId} — Cloudflare deploys the push regardless, see docs/operations/troubleshooting.md`
  )
}

const readPagesCheck = (field: 'conclusion' | 'details_url' | 'status') =>
  read(
    `gh api -X GET repos/${HOSTING.githubRepository}/commits/${commit}/check-runs -f check_name="${PAGES_CHECK}" -q ".check_runs[0].${field}"`
  )

const waitForPages = async (attemptsLeft: number): Promise<string> => {
  const status = readPagesCheck('status')
  if (status === 'completed' || attemptsLeft <= 1) return status
  await wait(PAGES_POLL_INTERVAL_MS)

  return waitForPages(attemptsLeft - 1)
}

printStep(SCOPE, 'CI passed; waiting for the Cloudflare Pages deploy')
if ((await waitForPages(PAGES_POLL_ATTEMPTS)) !== 'completed') {
  exitWithError(
    SCOPE,
    `no finished "${PAGES_CHECK}" check on ${COMMIT_URL}/${commit}: see docs/operations/troubleshooting.md`
  )
}
if (readPagesCheck('conclusion') !== 'success') {
  exitWithError(
    SCOPE,
    `the Cloudflare Pages deploy failed: ${readPagesCheck('details_url')} — see docs/operations/troubleshooting.md`
  )
}

printStep(SCOPE, `deployed to https://${HOSTING.publicDomain}`)
