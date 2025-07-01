import type { Album, AlbumType } from "@prisma/client";
import { type $DbEnums, getAlbumsByQuery } from "@prisma/client/sql";

import { prisma } from "api/prisma";

import { builder } from "../builder";
import { GraphQLAlbum } from "../types";

function mapAlbumType(type: $DbEnums.album_type): AlbumType {
  switch (type) {
    case "album": {
      return "ALBUM";
    }

    case "compilation": {
      return "COMPILATION";
    }

    case "ep": {
      return "EP";
    }

    case "live": {
      return "LIVE";
    }

    case "single": {
      return "SINGLE";
    }

    case "soundtrack": {
      return "SOUNDTRACK";
    }
  }
}

builder.queryField("albums", (t) =>
  t.fieldWithInput({
    type: [GraphQLAlbum],
    input: {
      query: t.input.string(),
      year: t.input.int(),
    },
    async resolve(_, { input: { query, year } }) {
      if (year != null) {
        return prisma.album.findMany({
          where: {
            year,
          },
        });
      } else if (query == null) {
        return [];
      } else {
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
            type: album.type ? mapAlbumType(album.type) : null,
          }),
        );
      }
    },
  }),
);
