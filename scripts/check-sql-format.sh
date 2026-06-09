#!/usr/bin/env bash
set -euo pipefail

source_dir="prisma/sql"
temp_dir="$(mktemp -d)"

cleanup() {
  rm -rf "$temp_dir"
}

trap cleanup EXIT

cp -R "$source_dir" "$temp_dir/sql"
sqlfluff fix "$temp_dir/sql" --config .sqlfluff --force

if ! diff -ru "$source_dir" "$temp_dir/sql"; then
  printf "\nSQL files are not formatted. Run pnpm sql:format.\n"
  exit 1
fi
