# Operations

Everything needed to run this site without help: one page per action, each
with its prerequisites, the exact command, what a good run prints, and the
errors met most often.

| Action                  | Command             | Page                                                 |
| ----------------------- | ------------------- | ---------------------------------------------------- |
| Deploy                  | `pnpm ship`         | [deploying.md](deploying.md)                         |
| Update the dependencies | `pnpm deps:upgrade` | [updating-dependencies.md](updating-dependencies.md) |
| Look up the hosting     | —                   | [hosting.md](hosting.md)                             |
| Secrets                 | —                   | [secrets.md](secrets.md)                             |
| A step broke            | —                   | [troubleshooting.md](troubleshooting.md)             |

## Where things live

| What                | Where                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| The site            | https://adrienlcp.com — Cloudflare Pages project `portfolio`, built and deployed by Cloudflare ([hosting.md](hosting.md)) |
| Repository          | `AdrienLcp/portfolio` on GitHub; a push runs `.github/workflows/ci.yml` and, on its own, a Cloudflare Pages build         |
| Secrets             | None: see [secrets.md](secrets.md)                                                                                        |
| Hosting identifiers | `scripts/operations/hosting.ts`                                                                                           |

## Tools on the machine

- Node 26 and pnpm through corepack (`corepack enable`), as `package.json` pins them.
- The GitHub CLI, `gh`, logged in (`gh auth status`) — `pnpm ship` uses it to
  follow the CI run and the Cloudflare Pages check. Without it, `pnpm ship`
  still pushes and prints the pages to watch.
