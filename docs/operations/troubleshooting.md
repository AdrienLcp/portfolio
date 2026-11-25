# When a step breaks

Find the step, read its log, apply the fix. The pages of each action carry
their own table of errors; this one covers what lies between them.

## Read the failure

A failed CI run:

```powershell
gh run list --limit 5
```

```powershell
gh run view <id> --log-failed
```

Expected: the log of the failing step only. Re-run it once the cause is fixed
— or straight away for a network hiccup:

```powershell
gh run rerun <id> --failed
```

A failed deploy: the commit's _Cloudflare Pages_ check on GitHub links to the
build log, as does dashboard → _Workers & Pages → portfolio → Deployments_.
A CI failure never stops the deploy, and a deploy failure never shows in CI.

## By step

| Step              | Symptom                                           | Fix                                                                                                                                        |
| ----------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| CI `pnpm install` | `ERR_PNPM_OUTDATED_LOCKFILE`                      | `pnpm install` here, commit `pnpm-lock.yaml`, ship.                                                                                        |
| CI lint           | `biome ci` errors                                 | `pnpm lint` here, commit, ship.                                                                                                            |
| CI spelling       | `Unknown word`                                    | Fix the typo, or add a real word to `cspell.json` → `words`.                                                                               |
| CI build or tests | A failing test or type error                      | Reproduce with `pnpm validate` here; fix; ship. The broken commit is online meanwhile: undo it ([deploying.md](deploying.md)) if it shows. |
| CI Lighthouse     | A score under its threshold                       | `pnpm lighthouse <path>` here on the built `dist`; the reports are uploaded as the run's `lighthouse-reports` artifact.                    |
| Cloudflare build  | The build log fails where `pnpm validate` passes  | A difference of environment: compare the Node version (`.nvmrc`) and the build settings with [hosting.md](hosting.md).                     |
| Cloudflare build  | No build for the commit                           | See [hosting.md](hosting.md), _Common errors_.                                                                                             |
| Site              | Old version still showing                         | Hard-reload. Check the _Deployments_ list holds the commit you expect as production.                                                       |
| Site              | Blank page, console errors                        | Undo the deploy ([deploying.md](deploying.md)), then reproduce locally with `pnpm build` and `pnpm preview`.                               |
| Any script        | `pnpm: command not found` or a wrong pnpm version | `corepack enable`, open a new terminal.                                                                                                    |

## Still stuck

Cloudflare status: https://www.cloudflarestatus.com — GitHub:
https://www.githubstatus.com
