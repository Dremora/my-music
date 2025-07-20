import type { AlbumType } from "@prisma/client";
import { fromUnixTime } from "date-fns";
import { z } from "zod";

import { ValidationError } from "api/errors";
import { prisma } from "api/prisma";

import { albumTypes, formats, locations } from "../schema/enums";

function trim(str: string) {
  return str.trim();
}

const newSourceSchema = z.object({
  accurateRip: z.nullable(z.optional(z.string().max(255).transform(trim))),
  comments: z.nullable(z.optional(z.string().max(255).transform(trim))),
  cueIssues: z.nullable(z.optional(z.string().max(255).transform(trim))),
  discs: z.nullable(z.optional(z.number().int().min(1).max(100))),
  download: z.nullable(z.optional(z.string().max(255).transform(trim))),
  edition: z.nullable(z.optional(z.string().max(255).transform(trim))),
  format: z.nullable(z.optional(z.enum(formats))),
  location: z.enum(locations),
  mbid: z.nullable(
    z.optional(
      z
        .string()
        .length(36)
        .regex(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
        ),
    ),
  ),
  tagIssues: z.nullable(z.optional(z.string().max(255).transform(trim))),
});

const sourceSchema = newSourceSchema.extend({
  id: z
    .nullable(
      z.optional(
        z
          .string()
          .regex(/[1-9][0-9]*/g)
          .transform(BigInt),
      ),
    )
    .transform((id) => id ?? undefined),
});

const firstPlayedTimestampSchema = z
  .object({
    timestamp: z.number().int().min(1),
    day: z.null().optional(),
    month: z.null().optional(),
    year: z.null().optional(),
  })
  .transform(({ timestamp }) => ({
    firstPlayedTimestamp: fromUnixTime(timestamp),
    firstPlayedDate: [],
  }));

const firstPlayedDateSchema = z
  .object({
    timestamp: z.null().optional(),
    day: z.number().int().min(1).max(31),
    month: z.number().int().min(1).max(12),
    year: z.number().int().min(1).max(2100),
  })
  .transform(({ day, month, year }) => ({
    firstPlayedTimestamp: null,
    firstPlayedDate: [year, month, day],
  }));

const firstPlayedMissing = z
  .null()
  .optional()
  .transform(() => ({
    firstPlayedTimestamp: null,
    firstPlayedDate: [],
  }));

const firstPlayedSchema = z.union([
  firstPlayedTimestampSchema,
  firstPlayedDateSchema,
  firstPlayedMissing,
]);

const newAlbumSchema = z.object({
  artist: z.string().min(1).max(255).transform(trim),
  title: z.string().min(1).max(255).transform(trim),
  comments: z.nullable(z.optional(z.string().max(255).transform(trim))),
  year: z.nullable(z.optional(z.number().int().min(1900).max(2100))),
  type: z.enum(albumTypes),
  sources: z.array(newSourceSchema),
  firstPlayed: firstPlayedSchema,
});

type FirstPlayed = {
  day?: number | null | undefined;
  month?: number | null | undefined;
  timestamp?: number | null | undefined;
  year?: number | null | undefined;
};

type NewAlbum = Readonly<{
  artist: string;
  comments: string | null;
  firstPlayed: FirstPlayed | null;
  sources: NewSource[];
  title: string;
  type: AlbumType | null;
  year?: number | null;
}>;

type NewSource = Readonly<{
  accurateRip?: string | null;
  comments?: string | null;
  cueIssues?: string | null;
  discs?: number | null;
  download?: string | null;
}>;

const albumSchema = newAlbumSchema.extend({
  id: z
    .string()
    .length(36)
    .regex(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g),
  sources: z.array(sourceSchema),
});

type SourceOrNewSource = Readonly<{
  accurateRip?: string | null;
  comments?: string | null;
  cueIssues?: string | null;
  discs?: number | null;
  download?: string | null;
  id?: string | null;
}>;

type UpdateAlbum = Readonly<{
  artist: string;
  comments: string | null;
  firstPlayed: FirstPlayed | null;
  id: string;
  sources: SourceOrNewSource[];
  title: string;
  type: AlbumType | null;
  year?: number | null;
}>;

export const createAlbum = async (album: NewAlbum) => {
  const { firstPlayed, sources, ...parsedAlbum } = newAlbumSchema.parse(album);

  return prisma.album.create({
    data: { ...parsedAlbum, ...firstPlayed, sources: { create: sources } },
  });
};

export const updateAlbum = async (album: UpdateAlbum) => {
  const { firstPlayed, sources, ...parsedAlbum } = albumSchema.parse(album);

  const sourceIds = await prisma.source.findMany({
    select: {
      id: true,
    },
    where: {
      albumId: parsedAlbum.id,
    },
  });

  const sourceIdsToDelete = sourceIds.filter(
    (source) => !sources.some((s) => s.id === source.id),
  );

  const newSources = sources.filter((source) => source.id === undefined);

  const existingSources = sources.filter((source) =>
    sourceIds.find((s) => s.id === source.id),
  );

  const unknownSourceIDs = sources
    .flatMap((source) => (source.id === undefined ? [] : [source.id]))
    .filter((sourceId) => !sourceIds.some((s) => s.id === sourceId))
    .map((sourceId) => sourceId.toString());

  if (unknownSourceIDs.length > 0) {
    throw new ValidationError(
      `Unknown source${unknownSourceIDs.length > 1 ? "s" : ""} for album ${
        parsedAlbum.id
      }: ${unknownSourceIDs.join(", ")}`,
    );
  }

  return prisma.album.update({
    where: {
      id: parsedAlbum.id,
    },
    data: {
      ...parsedAlbum,
      ...firstPlayed,
      sources: {
        create: newSources,
        update: existingSources.map((source) => ({
          where: {
            id: source.id,
          },
          data: source,
        })),
        delete: sourceIdsToDelete,
      },
    },
  });
};
