import { getAlbumPerFirstPlayedYearCount } from "@/generated/prisma/sql";
import { getPrismaClient } from "api/prisma";

import { builder } from "../builder";
import { GraphQLAlbumPerYearCount } from "../types";

builder.queryField("albumPerFirstPlayedYearCount", (t) =>
  t.field({
    type: [GraphQLAlbumPerYearCount],
    args: {
      appleMusicFilter: t.arg.boolean({ required: false }),
    },
    resolve: async (_, { appleMusicFilter }) => {
      const data = await getPrismaClient().$queryRawTyped(
        getAlbumPerFirstPlayedYearCount(appleMusicFilter ?? null),
      );

      return data.map((row) => ({
        count: Number(row.count ?? 0),
        year: Number(row.first_played_year ?? 0),
      }));
    },
  }),
);
