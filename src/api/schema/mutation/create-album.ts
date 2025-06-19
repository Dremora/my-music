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
  authorize: (_root, _args, context) => context.loggedIn,
  async resolve(
    _,
    { artist, comments, firstPlayed, sources, title, year },
    context,
  ) {
    return createAlbum(
      { artist, firstPlayed, title, comments, year, sources },
      context.prisma,
    );
  },
});
