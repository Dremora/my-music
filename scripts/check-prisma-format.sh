#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/.." && pwd)"
prisma_root="$repo_root/prisma"
snapshot_dir="$(mktemp -d)"
before_list="$snapshot_dir/before-files.txt"
after_list="$snapshot_dir/after-files.txt"

cleanup() {
  rm -rf "$snapshot_dir"
}

trap cleanup EXIT

list_prisma_files() {
  cd "$prisma_root"
  find . -type f -name '*.prisma' | LC_ALL=C sort
}

snapshot_prisma_files() {
  while IFS= read -r relative_path; do
    mkdir -p "$snapshot_dir/$(dirname "$relative_path")"
    cp "$prisma_root/$relative_path" "$snapshot_dir/$relative_path"
  done < "$before_list"
}

cd "$repo_root"
list_prisma_files > "$before_list"
snapshot_prisma_files
prisma format
list_prisma_files > "$after_list"

if ! cmp -s "$before_list" "$after_list"; then
  echo "Prisma formatting changed the set of .prisma files." >&2
  exit 1
fi

changed_files=()

while IFS= read -r relative_path; do
  if ! cmp -s "$snapshot_dir/$relative_path" "$prisma_root/$relative_path"; then
    changed_files+=("prisma/${relative_path#./}")
  fi
done < "$before_list"

if [ "${#changed_files[@]}" -eq 0 ]; then
  exit 0
fi

echo "Prisma formatting would modify these files:" >&2

for changed_file in "${changed_files[@]}"; do
  echo "$changed_file" >&2
done

exit 1
