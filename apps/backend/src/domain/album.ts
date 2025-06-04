import { PrismaClient } from "@prisma/client";
import { UserInputError } from "apollo-server";
import { fromUnixTime } from "date-fns";
import { Format, Location } from "nexus-prisma";
import { z } from "zod";

import { NexusGenArgTypes } from "src/nexus-typegen";

const trim = (str: string) => str.trim();

const newSourceSchema = z.object({
  accurateRip: z.nullable(z.optional(z.string().max(255).transform(trim))),
  comments: z.nullable(z.optional(z.string().max(255).transform(trim))),
  cueIssues: z.nullable(z.optional(z.string().max(255).transform(trim))),
  discs: z.nullable(z.optional(z.number().int().min(1).max(100))),
  download: z.nullable(z.optional(z.string().max(255).transform(trim))),
  edition: z.nullable(z.optional(z.string().max(255).transform(trim))),
  format: z.nullable(z.optional(z.enum(Format.members))),
  location: z.enum(Location.members),
  mbid: z.nullable(
    z.optional(
      z
        .string()
        .length(36)
        .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    )
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
          .transform(BigInt)
      )
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
  sources: z.array(newSourceSchema),
  firstPlayed: firstPlayedSchema,
});

const albumSchema = newAlbumSchema.extend({
  id: z
    .string()
    .length(36)
    .regex(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g),
  sources: z.array(sourceSchema),
});

export const createAlbum = async (
  album: NexusGenArgTypes["Mutation"]["createAlbum"],
  prisma: PrismaClient
) => {
  const { sources, firstPlayed, ...parsedAlbum } = newAlbumSchema.parse(album);

  return prisma.album.create({
    data: { ...parsedAlbum, ...firstPlayed, sources: { create: sources } },
  });
};

export const updateAlbum = async (
  album: NexusGenArgTypes["Mutation"]["updateAlbum"],
  prisma: PrismaClient
) => {
  const { sources, firstPlayed, ...parsedAlbum } = albumSchema.parse(album);

  const sourceIds = await prisma.source.findMany({
    select: {
      id: true,
    },
    where: {
      albumId: parsedAlbum.id,
    },
  });

  const sourceIdsToDelete = sourceIds.filter(
    (source) => !sources.find((s) => s.id === source.id)
  );

  const newSources = sources.filter((source) => !source.id);

  const existingSources = sources.filter((source) =>
    sourceIds.find((s) => s.id === source.id)
  );

  const unknownSourceIDs = sources
    .flatMap((source) => (source.id ? [source.id] : []))
    .filter((sourceId) => !sourceIds.find((s) => s.id === sourceId))
    .map((sourceId) => sourceId.toString());

  if (unknownSourceIDs.length) {
    throw new UserInputError(
      `Unknown source${unknownSourceIDs.length > 1 ? "s" : ""} for album ${
        parsedAlbum.id
      }: ${unknownSourceIDs.join(", ")}`
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
