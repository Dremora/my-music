import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { arg, mutationField } from "nexus";

export const deleteAlbum = mutationField("deleteAlbum", {
  type: "Boolean",
  args: {
    id: arg({ type: "UUID" }),
  },
  authorize: (_root, _args, context) => context.loggedIn,
  async resolve(_, { id }, context) {
    try {
      await context.prisma.album.delete({
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
});
