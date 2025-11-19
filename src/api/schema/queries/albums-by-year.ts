import { Location } from "@/generated/prisma/enums";
import { getPrismaClient } from "api/prisma";

import { builder } from "../builder";
import { GraphQLAlbum } from "../types";

builder.queryField("albumsByYear", (t) =>
  t.field({
    type: [GraphQLAlbum],
    args: {
      year: t.arg.int({ required: true }),
      appleMusicFilter: t.arg.boolean({ required: false }),
    },
    async resolve(_, { appleMusicFilter, year }) {
      const where: {
        sources?: {
          none?: { location: Location };
          some?: { location: Location };
        };
        year: number;
      } = {
        year,
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

      return getPrismaClient().album.findMany({
        where,
        orderBy: [
          {
            artist: "asc",
          },
          {
            title: "asc",
          },
        ],
      });
    },
  }),
);
