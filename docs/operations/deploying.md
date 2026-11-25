# Deploying

Cloudflare Pages is connected to the repository through its GitHub app: it
builds and deploys every push to `main` itself, and a preview of every other
branch. The CI workflow validates the same push alongside, but **does not gate
the deploy**: a commit that fails CI is online all the same. Run
`pnpm validate` before shipping.

Shipping is pushing; nothing is built or deployed from this machine.

## Ship — `pnpm ship`

Prerequisites: on `main`, everything committed, `origin/main` pulled,
`pnpm validate` green.

```powershell
pnpm ship
```

Expected: `git push` output, then `ship: pushed; watching CI run <id>`, the
run's jobs ticking green (validate and Lighthouse take a while),
`ship: CI passed; waiting for the Cloudflare Pages deploy`, and
`ship: deployed to https://adrienlcp.com`. Open the site and check the change.

| Error                                         | Fix                                                                                                                                                                    |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `only main deploys`                           | `git switch main`, merge or cherry-pick the work there.                                                                                                                |
| `the working tree has uncommitted changes`    | Commit (or `git stash`) first.                                                                                                                                         |
| `origin/main has commits this checkout lacks` | `git pull --rebase`, then `pnpm validate`, then `pnpm ship`.                                                                                                           |
| `nothing to ship`                             | Every commit is already pushed. To re-deploy the same commit: Cloudflare dashboard → _Workers & Pages → portfolio → Deployments_, its deployment → _Retry deployment_. |
| `the CI run failed`                           | The commit is deployed anyway. Open the run link it prints; fix and ship, or undo the deploy (below). See [troubleshooting.md](troubleshooting.md).                    |
| `the Cloudflare Pages deploy failed`          | Open the build log link it prints; see [troubleshooting.md](troubleshooting.md).                                                                                       |
| `no finished "Cloudflare Pages" check`        | Cloudflare did not build the commit within fifteen minutes: open the commit link it prints and the dashboard's _Deployments_ list.                                     |
| `pushed; follow CI on …`                      | `gh` is missing or logged out; the push is done, watch the pages it prints. `gh auth login` fixes it for next time.                                                    |

## Undo a deploy

The way that leaves the history right: revert the commit and ship.

```powershell
git revert <commit>
```

```powershell
pnpm ship
```

Faster, while the fix is prepared: Cloudflare dashboard → _Workers & Pages →
portfolio → Deployments_, a previous production deployment → _Rollback_. The
next push replaces the rollback.
