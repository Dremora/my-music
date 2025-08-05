import { getPrismaClient } from "api/prisma";

import { builder } from "../builder";
import { GraphQLAlbumPerYearCount } from "../types";

builder.queryField("albumPerYearCount", (t) =>
  t.field({
    type: [GraphQLAlbumPerYearCount],
    resolve: async (_, _args) => {
      const data = await getPrismaClient().album.groupBy({
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
        .filter(function (item): item is { count: number; year: number } {
          return item.year !== null;
        });
    },
  }),
);
