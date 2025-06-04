import { arg, intArg, list, mutationField, nullable, stringArg } from "nexus";

import { createAlbum } from "../../domain/album";

export const createAlbumMutation = mutationField("createAlbum", {
  type: "Album",
  args: {
    artist: stringArg(),
    title: stringArg(),
    comments: nullable(stringArg()),
    year: nullable(intArg()),
    sources: list("NewSourceInput"),
    firstPlayed: nullable(arg({ type: "FirstPlayedInput" })),
  },
  authorize: (_root, _args, ctx) => ctx.loggedIn,
  async resolve(
    _,
    { artist, title, comments, year, sources, firstPlayed },
    ctx
  ) {
    return createAlbum(
      { artist, firstPlayed, title, comments, year, sources },
      ctx.prisma
    );
  },
});
