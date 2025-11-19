import type { AlbumModel } from "@/generated/prisma/models/Album";
import { getAlbumsByQuery } from "@/generated/prisma/sql";
import { getPrismaClient } from "api/prisma";

import { builder } from "../builder";
import { GraphQLAlbum } from "../types";
import { mapAlbumType } from "../utils";

builder.queryField("albums", (t) =>
  t.fieldWithInput({
    type: [GraphQLAlbum],
    input: {
      query: t.input.string({ required: true }),
      appleMusicFilter: t.input.boolean({ required: false }),
    },
    async resolve(_, { input: { appleMusicFilter, query } }) {
      const albums = await getPrismaClient().$queryRawTyped(
        getAlbumsByQuery(query, appleMusicFilter ?? null),
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
