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
  authorize: (_root, _args, context) => context.loggedIn,
  async resolve(
    _,
    { artist, comments, firstPlayed, id, sources, title, year },
    context,
  ) {
    return updateAlbum(
      { artist, id, firstPlayed, title, comments, year, sources },
      context.prisma,
    );
  },
});
