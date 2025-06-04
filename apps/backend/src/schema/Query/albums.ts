import { parseISO } from "date-fns";
import { arg, list, queryField } from "nexus";

type RawAlbum = {
  id: string;
  artist: string;
  comments: string | null;
  first_played_timestamp: string | null;
  first_played_date: number[];
  title: string;
  year: number | null;
  inserted_at: string;
  updated_at: string;
};

export const albumsQuery = queryField("albums", {
  type: list("Album"),
  args: {
    filter: arg({
      type: "AlbumFilterInput",
    }),
  },
  async resolve(_, { filter: { query, year } }, ctx) {
    if (year) {
      return ctx.prisma.album.findMany({
        where: {
          year,
        },
      });
    } else if (query) {
      const albums = await ctx.prisma.$queryRaw<RawAlbum[]>`
      select
        id,
        artist,
        comments,
        first_played_timestamp,
        first_played_date,
        title,
        year,
        inserted_at,
        updated_at
      from
        albums
      where
        edge_gram_tsvector(immutable_unaccent(title)) ||
        edge_gram_tsvector(immutable_unaccent(artist)) ||
        coalesce(edge_gram_tsvector(coalesce(year :: text)), array_to_tsvector('{}'))
        @@ plainto_tsquery('simple', immutable_unaccent(${query}))
      limit
        50`;

      return albums.map(
        ({
          first_played_timestamp,
          first_played_date,
          inserted_at,
          updated_at,
          ...album
        }) => ({
          firstPlayedDate: first_played_date,
          firstPlayedTimestamp: first_played_timestamp
            ? parseISO(first_played_timestamp)
            : null,
          createdAt: parseISO(inserted_at),
          updatedAt: parseISO(updated_at),
          ...album,
        })
      );
    } else {
      return [];
    }
  },
});
