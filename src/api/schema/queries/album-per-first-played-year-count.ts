import { getAlbumPerFirstPlayedYearCount } from "@prisma/client/sql";

import { prisma } from "api/prisma";

import { builder } from "../builder";
import { GraphQLAlbumPerYearCount } from "../types";

builder.queryField("albumPerFirstPlayedYearCount", (t) =>
  t.field({
    type: [GraphQLAlbumPerYearCount],
    resolve: async (_, _args) => {
      const data = await prisma.$queryRawTyped(
        getAlbumPerFirstPlayedYearCount(),
      );

      return data.map((row) => ({
        count: Number(row.count ?? 0),
        year: Number(row.first_played_year ?? 0),
      }));
    },
  }),
);
