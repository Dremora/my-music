import { parseAlbumsAppBackup } from "./parse";

async function main() {
  const filePath = process.argv[2];

  if (filePath === undefined || filePath === "") {
    throw new Error(
      "Usage: node --import @swc-node/register/esm-register src/scripts/albums-backup/index.ts <path-to-backup.json>",
    );
  }

  console.log(`Parsing Albums app backup: ${filePath}\n`);

  const startTime = performance.now();
  const { data, errors } = await parseAlbumsAppBackup(filePath);
  const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);

  console.log("\n--- Summary ---");
  console.log(`Artists:              ${data.albumsAndArtists.artists.length}`);
  console.log(`Albums:               ${data.albumsAndArtists.albums.length}`);
  console.log(`Play history items:   ${data.playHistory.length}`);
  console.log(`Credit people:        ${data.credits.people.length}`);
  console.log(`Credit labels:        ${data.credits.labels.length}`);
  console.log(`Credit entries:       ${data.credits.credits.length}`);
  console.log(`Release feed objects: ${data.misc.releaseFeedObjects.length}`);
  console.log(`Tags:                 ${data.misc.tags.length}`);
  console.log(`Quick actions:        ${data.misc.quickActions.length}`);
  console.log(`Filters:              ${data.misc.filters.length}`);
  console.log(`Previous searches:    ${data.misc.previousSearches.length}`);
  console.log(`Notes:                ${data.misc.notes.length}`);
  console.log(`Device name:          ${data.misc.name}`);

  console.log(`\nTime: ${elapsed}s`);

  const memUsage = process.memoryUsage();

  console.log(
    `Peak RSS: ${(memUsage.rss / 1024 / 1024).toFixed(0)}MB, Heap: ${(memUsage.heapUsed / 1024 / 1024).toFixed(0)}MB`,
  );

  if (errors.length > 0) {
    console.log(`\n--- Validation Errors (${errors.length}) ---`);

    for (const error of errors.slice(0, 20)) {
      console.log(`  [${error.path}][${error.index}] ${error.message}`);
    }

    if (errors.length > 20) {
      console.log(`  ... and ${errors.length - 20} more`);
    }

    throw new Error(`${errors.length} validation errors found`);
  }

  console.log("\nNo validation errors.");
}

main().catch((error: unknown) => {
  console.error("Fatal error:", error);
  process.exitCode = 1;
});
