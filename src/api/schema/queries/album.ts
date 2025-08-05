import { getPrismaClient } from "api/prisma";

import { builder } from "../builder";
import { GraphQLAlbum } from "../types";

builder.queryField("album", (t) =>
  t.field({
    type: GraphQLAlbum,
    args: {
      id: t.arg({ type: "UUID", required: true }),
    },
    resolve: async (_, { id }) => {
      return getPrismaClient().album.findUniqueOrThrow({
        where: {
          id,
        },
      });
    },
  }),
);
