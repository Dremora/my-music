import type { AlbumModel } from "@/generated/prisma/models/Album";
import { getAlbumsByFirstPlayedYear } from "@/generated/prisma/sql";
import { getPrismaClient } from "api/prisma";

import { builder } from "../builder";
import { GraphQLAlbum } from "../types";
import { mapAlbumType } from "../utils";

builder.queryField("albumsByFirstPlayedYear", (t) =>
  t.field({
    type: [GraphQLAlbum],
    args: {
      year: t.arg.int({ required: true }),
      appleMusicFilter: t.arg.boolean({ required: false }),
    },
    resolve: async (_, { appleMusicFilter, year }) => {
      const albums = await getPrismaClient().$queryRawTyped(
        getAlbumsByFirstPlayedYear(year, appleMusicFilter ?? null),
      );

      return albums.map(
        ({
          first_played_date,
          first_played_timestamp,
          inserted_at,
          updated_at,
          ...album
        }): AlbumModel => ({
          firstPlayedDate: first_played_date ?? [],
          firstPlayedTimestamp: first_played_timestamp,
          createdAt: inserted_at,
          updatedAt: updated_at,
          artist: album.artist,
          comments: album.comments,
          title: album.title,
          year: album.year,
          id: album.id,
          type: album.type ? mapAlbumType(album.type) : null,
        }),
      );
    },
  }),
);
