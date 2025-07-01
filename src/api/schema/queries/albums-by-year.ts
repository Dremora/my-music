import { prisma } from "api/prisma";

import { builder } from "../builder";
import { GraphQLAlbum } from "../types";

builder.queryField("albumsByYear", (t) =>
  t.field({
    type: [GraphQLAlbum],
    args: {
      year: t.arg.int({ required: true }),
    },
    async resolve(_, { year }) {
      return prisma.album.findMany({
        where: {
          year,
        },
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
