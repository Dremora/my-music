import { Location } from "@/generated/prisma/enums";
import { getPrismaClient } from "api/prisma";

import { builder } from "../builder";
import { GraphQLAlbumPerYearCount } from "../types";

builder.queryField("albumPerYearCount", (t) =>
  t.field({
    type: [GraphQLAlbumPerYearCount],
    args: {
      appleMusicFilter: t.arg.boolean({ required: false }),
    },
    resolve: async (_, { appleMusicFilter }) => {
      const where: {
        sources?: {
          none?: { location: Location };
          some?: { location: Location };
        };
        year: { not: null };
      } = {
        year: {
          not: null,
        },
      };

      if (appleMusicFilter === true) {
        where.sources = {
          some: {
            location: Location.APPLE_MUSIC,
          },
        };
      } else if (appleMusicFilter === false) {
        where.sources = {
          none: {
            location: Location.APPLE_MUSIC,
          },
        };
      }

      const data = await getPrismaClient().album.groupBy({
        by: ["year"],
        _count: {
          year: true,
        },
        orderBy: {
          year: "asc",
        },
        where,
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
