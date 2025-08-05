import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { getPrismaClient } from "api/prisma";

import { builder } from "../builder";

builder.mutationField("deleteAlbum", (t) =>
  t
    .withAuth({
      loggedIn: true,
    })
    .field({
      type: "Boolean",
      args: {
        id: t.arg({ type: "UUID", required: true }),
      },
      async resolve(_, { id }) {
        try {
          await getPrismaClient().album.delete({
            where: { id },
          });

          return true;
        } catch (error) {
          if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2025"
          ) {
            return false;
          }

          throw error;
        }
      },
    }),
);
