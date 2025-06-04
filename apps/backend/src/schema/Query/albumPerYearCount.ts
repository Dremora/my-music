import { list, queryField } from "nexus";

import { NexusGenObjects } from "src/nexus-typegen";

export const albumPerYearCount = queryField("albumPerYearCount", {
  type: list("AlbumPerYearCount"),
  resolve: async (_, _args, ctx) => {
    const data = await ctx.prisma.album.groupBy({
      by: ["year"],
      _count: {
        year: true,
      },
      orderBy: {
        year: "asc",
      },
      where: {
        year: {
          not: null,
        },
      },
    });

    return data
      .map((item) => ({
        year: item.year,
        count: item._count.year,
      }))
      .filter(function (item): item is NexusGenObjects["AlbumPerYearCount"] {
        return item.year !== null;
      });
  },
});
