import { list, queryField } from "nexus";

type RawAlbumPerYearCount = {
  count: number;
  first_played_year: number;
};

export const albumPerFirstPlayedYearCount = queryField(
  "albumPerFirstPlayedYearCount",
  {
    type: list("AlbumPerYearCount"),
    resolve: async (_, _args, ctx) => {
      const data = await ctx.prisma.$queryRaw<RawAlbumPerYearCount[]>`
        select
          coalesce(
            extract(year from first_played_timestamp),
            first_played_date[1],
            2005
          ) as first_played_year,
          count(*)
        from
          albums
        group by first_played_year
      `;
      return data.map((row) => ({
        count: row.count,
        year: row.first_played_year,
      }));
    },
  }
);
