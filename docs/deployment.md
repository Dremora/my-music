# Deployment

This app deploys to the shared personal Hetzner server with Kamal. The generic
server provisioning lives in `~/Code/pixel-perfect-development`; this repo only
contains the app-level deploy configuration.

## Flow

1. GitHub Actions runs checks against a local Postgres service.
2. On `main`, CI generates Prisma and Relay artifacts against a temporary
   Postgres service, then Kamal builds and pushes the Docker image to GHCR.
3. Kamal runs `.kamal/hooks/pre-deploy`, which applies Prisma migrations from a
   one-off container using the newly built image version. Initial `kamal setup`
   skips this hook because Kamal has not created app env files or accessories
   yet.
4. Kamal boots the new app container and routes traffic through `kamal-proxy`.

## Required Server State

Use the existing personal server provisioning from
`~/Code/pixel-perfect-development/infra/ansible`. Do not add another Ansible
instance to this repo.

The configured app URL is `https://my-music.dremora.com`.

## Required GitHub Secrets

- `FNOX_AGE_KEY`

CI decrypts `fnox.production.toml` with `FNOX_AGE_KEY`. The Kamal SSH private
key and pinned server host key are stored in `fnox.production.toml` as
`KAMAL_SSH_PRIVATE_KEY` and `KAMAL_SSH_HOST_KEY` so local and CI deploys use the
same SSH path. `KAMAL_REGISTRY_PASSWORD` is provided by GitHub Actions as
`GITHUB_TOKEN`.

Get the server host key with:

```bash
ssh-keyscan 37.27.241.78
```

## Runtime Env

Local development secrets live in `fnox.toml`. Production runtime application
secrets live in `fnox.production.toml`. CI decrypts production values with
`FNOX_AGE_KEY`; local production commands can use the personal age recipient
already configured for the file. Kamal reads the decrypted values through
`.kamal/secrets`. `DATABASE_URL` and `DIRECT_DATABASE_URL` are derived from
`POSTGRES_PASSWORD` and point at the Kamal Postgres accessory:

```text
postgresql://my_music:<password>@my-music-postgres:5432/my_music
```

Use a URL-safe `POSTGRES_PASSWORD` because it is interpolated into the database
URL.

Do not deploy `.env.local`. Local and production runtime values are managed
through fnox.

## First Deploy

After the shared server provisioning exists, run the one-time Kamal setup:

```bash
KAMAL_REGISTRY_PASSWORD="<github-token-with-package-access>" \
MISE_ENV=production mise exec -- fnox exec -c fnox.production.toml -- \
  kamal setup --version="$(git rev-parse HEAD)"
```

Then run the initial database migration once, after Kamal has created the app
env files and Postgres accessory:

```bash
KAMAL_REGISTRY_PASSWORD="<github-token-with-package-access>" \
MISE_ENV=production mise exec -- fnox exec -c fnox.production.toml -- \
  kamal app exec --primary "pnpm db:migrate:prod"
```

After setup, GitHub Actions runs normal `kamal deploy` commands.
