/* eslint-disable import-x/no-named-as-default-member -- stream-json is CJS, default imports required in ESM */
import { createReadStream } from "node:fs";
import type { Readable } from "node:stream";

import make from "stream-json";
import Assembler from "stream-json/Assembler.js";
import Pick from "stream-json/filters/Pick.js";
import StreamArray from "stream-json/streamers/StreamArray.js";
import type { z } from "zod";

import {
  albumSchema,
  appSettingsSchema,
  artistSchema,
  creditEntrySchema,
  creditLabelSchema,
  creditPersonSchema,
  playHistoryItemSchema,
} from "./schema";
import type { AlbumsAppBackup, AppSettings } from "./schema";

type ValidationError = {
  index: number;
  message: string;
  path: string;
};

export type ParseResult = {
  data: AlbumsAppBackup;
  errors: ValidationError[];
};

async function streamParseArray<T>(
  filePath: string,
  pathSegments: string[],
  schema: z.ZodType<T>,
  pathLabel: string,
): Promise<{ errors: ValidationError[]; items: T[] }> {
  return new Promise((resolve, reject) => {
    const items: T[] = [];
    const errors: ValidationError[] = [];

    const readStream = createReadStream(filePath);
    const jsonParser = make.parser();
    const arrayStream = StreamArray.streamArray();

    // Build pipeline: readStream → parser → pick(s) → streamArray
    let current: Readable = readStream.pipe(jsonParser);

    for (const segment of pathSegments) {
      current = current.pipe(Pick.pick({ filter: segment }));
    }

    current.pipe(arrayStream);

    arrayStream.on(
      "data",
      ({ key, value }: { readonly key: number; readonly value: unknown }) => {
        const result = schema.safeParse(value);

        if (result.success) {
          items.push(result.data);
        } else {
          errors.push({
            path: pathLabel,
            index: key,
            message: result.error.issues
              .map((i) => `${i.path.join(".")}: ${i.message}`)
              .join("; "),
          });
        }
      },
    );

    arrayStream.on("end", () => {
      resolve({ items, errors });
    });

    readStream.on("error", reject);
    jsonParser.on("error", reject);
    arrayStream.on("error", reject);
  });
}

async function streamParseObject<T>(
  filePath: string,
  pathSegments: string[],
  schema: z.ZodType<T>,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const readStream = createReadStream(filePath);
    const jsonParser = make.parser();

    let current: Readable = readStream.pipe(jsonParser);

    for (const segment of pathSegments) {
      current = current.pipe(Pick.pick({ filter: segment }));
    }

    const asm = Assembler.connectTo(current);

    asm.on("done", (assembler: typeof asm) => {
      const result = schema.safeParse(assembler.current);

      if (result.success) {
        resolve(result.data);
      } else {
        reject(
          new Error(
            `Validation failed for object: ${result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`,
          ),
        );
      }
    });

    readStream.on("error", reject);
    jsonParser.on("error", reject);
  });
}

export async function parseAlbumsAppBackup(
  filePath: string,
): Promise<ParseResult> {
  const allErrors: ValidationError[] = [];

  console.log("Parsing artists...");

  const artists = await streamParseArray(
    filePath,
    ["albumsAndArtists", "artists"],
    artistSchema,
    "albumsAndArtists.artists",
  );

  allErrors.push(...artists.errors);
  console.log(`  ${artists.items.length} artists parsed`);

  console.log("Parsing albums...");

  const albums = await streamParseArray(
    filePath,
    ["albumsAndArtists", "albums"],
    albumSchema,
    "albumsAndArtists.albums",
  );

  allErrors.push(...albums.errors);
  console.log(`  ${albums.items.length} albums parsed`);

  console.log("Parsing play history...");

  const playHistory = await streamParseArray(
    filePath,
    ["playHistory"],
    playHistoryItemSchema,
    "playHistory",
  );

  allErrors.push(...playHistory.errors);
  console.log(`  ${playHistory.items.length} play history items parsed`);

  console.log("Parsing credit people...");

  const people = await streamParseArray(
    filePath,
    ["credits", "people"],
    creditPersonSchema,
    "credits.people",
  );

  allErrors.push(...people.errors);
  console.log(`  ${people.items.length} credit people parsed`);

  console.log("Parsing credit labels...");

  const labels = await streamParseArray(
    filePath,
    ["credits", "labels"],
    creditLabelSchema,
    "credits.labels",
  );

  allErrors.push(...labels.errors);
  console.log(`  ${labels.items.length} credit labels parsed`);

  console.log("Parsing credit entries...");

  const credits = await streamParseArray(
    filePath,
    ["credits", "credits"],
    creditEntrySchema,
    "credits.credits",
  );

  allErrors.push(...credits.errors);
  console.log(`  ${credits.items.length} credit entries parsed`);

  console.log("Parsing misc...");

  const misc = await streamParseObject<AppSettings>(
    filePath,
    ["misc"],
    appSettingsSchema,
  );

  console.log(
    `  misc parsed (${misc.releaseFeedObjects.length} release feed objects, ${misc.tags.length} tags, ${misc.quickActions.length} quick actions, ${misc.previousSearches.length} previous searches)`,
  );

  return {
    data: {
      albumsAndArtists: {
        artists: artists.items,
        albums: albums.items,
      },
      playHistory: playHistory.items,
      credits: {
        people: people.items,
        labels: labels.items,
        credits: credits.items,
      },
      misc,
    },
    errors: allErrors,
  };
}
