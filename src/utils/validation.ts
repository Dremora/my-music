import { z } from "zod/v4-mini";

import type {
  AlbumType,
  Format,
  Location,
} from "generated/albumFormFragment.graphql";

export const artistSchema = z.string().check(
  z.trim(),
  z.minLength(1, { message: "Artist is required" }),
  z.maxLength(1000, {
    message: "Artist must be less than 1000 characters",
  }),
);

export const titleSchema = z.string().check(
  z.trim(),
  z.minLength(1, { message: "Title is required" }),
  z.maxLength(1000, {
    message: "Title must be less than 1000 characters",
  }),
);

export const albumTypes: { id: AlbumType; label: string }[] = [
  { id: "ALBUM", label: "Album" },
  { id: "EP", label: "EP" },
  { id: "SINGLE", label: "Single" },
  { id: "COMPILATION", label: "Compilation" },
  { id: "LIVE", label: "Live album" },
  { id: "SOUNDTRACK", label: "Soundtrack" },
];

export const albumTypesSchema = z.enum(
  albumTypes.map((type) => type.id),
  {
    error: "Album type is required",
  },
);

export const yearSchema = z.union(
  [z.null(), z.int().check(z.gte(1900), z.lte(2100))],
  {
    error: "Year must be between 1900 and 2100",
  },
);

export const albumCommentsSchema = z.union(
  [
    z.null(),
    z.pipe(
      z.string().check(z.trim(), z.length(0)),
      z.transform(() => null),
    ),
    z.string().check(z.trim(), z.maxLength(1000)),
  ],
  {
    error: "Comments must be less than 1000 characters",
  },
);

export const mbidSchema = z.union(
  [
    z.null(),
    z.pipe(
      z.literal(""),
      z.transform(() => null),
    ),
    z.pipe(z.string().check(z.trim()), z.guid()),
  ],
  {
    error: "Invalid MBID",
  },
);

function buildAlbumSourceOptionalFieldSchema(name: string) {
  return z.union(
    [
      z.null(),
      z.pipe(
        z.string().check(z.trim(), z.length(0)),
        z.transform(() => null),
      ),
      z.string().check(z.trim(), z.maxLength(1000)),
    ],
    {
      error: `${name} must be less than 1000 characters`,
    },
  );
}

export const sourceCommentsSchema =
  buildAlbumSourceOptionalFieldSchema("Comments");

export const tagIssuesSchema =
  buildAlbumSourceOptionalFieldSchema("Tag issues");

export const accurateRipSchema =
  buildAlbumSourceOptionalFieldSchema("Accurate Rip");

export const cueIssuesSchema =
  buildAlbumSourceOptionalFieldSchema("Cue issues");

export const discsSchema = z.union(
  [z.null(), z.int().check(z.gte(1), z.lte(100))],
  {
    error: "Discs must be between 1 and 100",
  },
);

export const downloadSchema = buildAlbumSourceOptionalFieldSchema("Download");

export const editionSchema = buildAlbumSourceOptionalFieldSchema("Edition");

export const sourceLocations: { id: Location; label: string }[] = [
  { id: "APPLE_MUSIC", label: "Apple Music" },
  { id: "GOOGLE_MUSIC", label: "Google Music" },
  { id: "SPOTIFY", label: "Spotify" },
  { id: "FOOBAR2000", label: "foobar2000" },
];

export const sourceFormats: { id: Format; label: string }[] = [
  { id: "MP3", label: "Lossy (MP3)" },
  { id: "MPC", label: "Lossy (MPC)" },
  { id: "WMA", label: "Lossy (WMA)" },
  { id: "TAK", label: "Lossless (TAK)" },
  { id: "APE", label: "Lossless (APE)" },
  { id: "FLAC", label: "Lossless (FLAC)" },
  { id: "MIXED", label: "Mixed" },
];

export const sourceFormatsSchema = z.enum(
  sourceFormats.map((format) => format.id),
  {
    error: "Format is required",
  },
);

export const sourceLocationsSchema = z.enum(
  sourceLocations.map((location) => location.id),
  {
    error: "Location is required",
  },
);
