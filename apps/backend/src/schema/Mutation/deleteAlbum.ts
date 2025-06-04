import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { arg, mutationField } from "nexus";

export const deleteAlbum = mutationField("deleteAlbum", {
  type: "Boolean",
  args: {
    id: arg({ type: "UUID" }),
  },
  authorize: (_root, _args, ctx) => ctx.loggedIn,
  async resolve(_, { id }, ctx) {
    try {
      await ctx.prisma.album.delete({
        where: { id },
      });
      return true;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          return false;
        }
      }
      throw e;
    }
  },
});
