import type { Album } from "@prisma/client";
import { getAlbumsByQuery } from "@prisma/client/sql";
import { arg, list, queryField } from "nexus";

export const albumsQuery = queryField("albums", {
  type: list("Album"),
  args: {
    filter: arg({
      type: "AlbumFilterInput",
    }),
  },
  async resolve(_, { filter: { query, year } }, context) {
    if (year !== undefined && year !== null) {
      return context.prisma.album.findMany({
        where: {
          year,
        },
      });
    } else if (query !== undefined && query !== null) {
      const albums = await context.prisma.$queryRawTyped(
        getAlbumsByQuery(query),
      );

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
      return [];
    }
  },
});
