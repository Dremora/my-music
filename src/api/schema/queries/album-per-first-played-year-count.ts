import { getAlbumPerFirstPlayedYearCount } from "@/generated/prisma/sql";
import { getPrismaClient } from "api/prisma";

import { builder } from "../builder";
import { GraphQLAlbumPerYearCount } from "../types";

builder.queryField("albumPerFirstPlayedYearCount", (t) =>
  t.field({
    type: [GraphQLAlbumPerYearCount],
    resolve: async (_, _args) => {
      const data = await getPrismaClient().$queryRawTyped(
        getAlbumPerFirstPlayedYearCount(),
      );

      return data.map((row) => ({
        count: Number(row.count ?? 0),
        year: Number(row.first_played_year ?? 0),
      }));
    },
  }),
);
