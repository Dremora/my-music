import { arg, intArg, list, mutationField, nullable, stringArg } from "nexus";

import { updateAlbum } from "../../domain/album";

export const updateAlbumMutation = mutationField("updateAlbum", {
  type: "Album",
  args: {
    artist: stringArg(),
    title: stringArg(),
    comments: nullable(stringArg()),
    id: arg({ type: "UUID" }),
    year: nullable(intArg()),
    sources: list("SourceInput"),
    firstPlayed: nullable(arg({ type: "FirstPlayedInput" })),
  },
  authorize: (_root, _args, ctx) => ctx.loggedIn,
  async resolve(
    _,
    { artist, id, title, comments, year, sources, firstPlayed },
    ctx
  ) {
    return updateAlbum(
      { artist, id, firstPlayed, title, comments, year, sources },
      ctx.prisma
    );
  },
});
