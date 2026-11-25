# Secrets

This site holds none, and has nothing to sync.

- **The deploy needs no token.** Cloudflare builds the repository through its
  GitHub app, installed once on the account ([hosting.md](hosting.md)). No
  CI step deploys, so the repository has no `CLOUDFLARE_*` secret.
- **The Web3Forms access key is public.** Web3Forms only forwards to the inbox
  the key belongs to, so it is a named constant beside its client,
  `src/infrastructure/web3forms/web3forms-client.ts`.

A secret that comes later enters the personal Bitwarden first, folder
`Projects`, item `portfolio <VARIABLE>`: Cloudflare and GitHub never give a
secret back.
