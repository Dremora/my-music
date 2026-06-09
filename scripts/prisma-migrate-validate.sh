#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/.." && pwd)"
prisma_output=""
prisma_status=0

cd "$repo_root"

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is required." >&2
  exit 1
fi

run_prisma() {
  set +e
  prisma_output="$(prisma "$@" 2>&1)"
  prisma_status=$?
  set -e
}

fail() {
  local message="$1"
  local output="$2"

  echo "$message" >&2

  if [ -n "$output" ]; then
    echo >&2
    echo "$output" >&2
  fi

  exit 1
}

print_output() {
  local output="$1"

  if [ -n "$output" ]; then
    echo "$output"
  fi
}

run_prisma migrate diff \
  --exit-code \
  --from-migrations prisma/migrations \
  --to-schema prisma

if [ "$prisma_status" -eq 1 ]; then
  fail "Failed to diff Prisma schema against migration history." "$prisma_output"
fi

if [ "$prisma_status" -eq 2 ]; then
  fail "Migration history does not match the Prisma schema in \`prisma/\`. Refuse to continue." "$prisma_output"
fi

run_prisma migrate diff \
  --exit-code \
  --from-config-datasource \
  --to-migrations prisma/migrations
database_matches_migration_head_status="$prisma_status"
database_matches_migration_head_output="$prisma_output"

if [ "$database_matches_migration_head_status" -eq 1 ]; then
  fail "Failed to diff the configured database against migration history." "$database_matches_migration_head_output"
fi

run_prisma migrate status
migration_status_output="$prisma_output"

is_up_to_date=false
has_only_pending_migrations=false

if [[ "$migration_status_output" == *"Database schema is up to date!"* ]]; then
  is_up_to_date=true
fi

if [[ "$migration_status_output" == *"Following migration have not yet been applied:"* ]] ||
  [[ "$migration_status_output" == *"Following migrations have not yet been applied:"* ]]; then
  has_only_pending_migrations=true
fi

if [ "$is_up_to_date" = false ] && [ "$has_only_pending_migrations" = false ]; then
  fail "The database is not in a clean migratable state. Refuse to continue." "$migration_status_output"
fi

if [ "$is_up_to_date" = true ] && [ "$database_matches_migration_head_status" -ne 0 ]; then
  fail "Prisma reports the database as up to date, but the schema diff against migration history is not empty." "$database_matches_migration_head_output"
fi

if [ "$has_only_pending_migrations" = true ] &&
  [ "$database_matches_migration_head_status" -ne 0 ] &&
  [ "$database_matches_migration_head_status" -ne 2 ]; then
  fail "Prisma reports pending migrations, but the schema diff against migration history is unexpectedly empty." "$database_matches_migration_head_output"
fi

print_output "$migration_status_output"
echo

if [ "$has_only_pending_migrations" = true ]; then
  echo "Validation passed: migration history matches \`prisma/\`, and the database only has unapplied migrations."
else
  echo "Validation passed: migration history matches \`prisma/\`, and the database is already at migration head."
fi
