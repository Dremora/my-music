import type { Album } from "@prisma/client";
import { getAlbumsByQuery } from "@prisma/client/sql";

import { prisma } from "api/prisma";

import { builder } from "../builder";
import { GraphQLAlbum } from "../types";

builder.queryField("albums", (t) =>
  t.fieldWithInput({
    type: [GraphQLAlbum],
    input: {
      query: t.input.string(),
      year: t.input.int(),
    },
    async resolve(_, { input: { query, year } }) {
      if (query == null) {
        return [];
      } else if (year == null) {
        const albums = await prisma.$queryRawTyped(getAlbumsByQuery(query));

        return albums.map(
          ({
            first_played_date,
            first_played_timestamp,
            inserted_at,
            updated_at,
            ...album
          }): Album => ({
            firstPlayedDate: first_played_date ?? [],
            firstPlayedTimestamp: first_played_timestamp,
            createdAt: inserted_at,
            updatedAt: updated_at,
            artist: album.artist,
            comments: album.comments,
            title: album.title,
            year: album.year,
            id: album.id,
          }),
        );
      } else {
        return prisma.album.findMany({
          where: {
            year,
          },
        });
      }
    },
  }),
);
