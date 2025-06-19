import { getAlbumPerFirstPlayedYearCount } from "@prisma/client/sql";
import { list, queryField } from "nexus";

export const albumPerFirstPlayedYearCount = queryField(
  "albumPerFirstPlayedYearCount",
  {
    type: list("AlbumPerYearCount"),
    resolve: async (_, _args, context) => {
      const data = await context.prisma.$queryRawTyped(
        getAlbumPerFirstPlayedYearCount(),
      );

      return data.map((row) => ({
        count: Number(row.count ?? 0),
        year: Number(row.first_played_year ?? 0),
      }));
    },
  },
);
