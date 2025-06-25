import { updateAlbum } from "../../domain/album";
import { builder } from "../builder";
import { GraphQLFormat, GraphQLLocation } from "../enums";
import { GraphQLFirstPlayedInput } from "../inputs";
import { GraphQLAlbum } from "../types";

export const GraphQLSourceInput = builder.inputType("SourceInput", {
  fields: (t) => ({
    id: t.id(),
    accurateRip: t.string(),
    comments: t.string(),
    cueIssues: t.string(),
    discs: t.int(),
    download: t.string(),
    edition: t.string(),
    format: t.field({ type: GraphQLFormat }),
    location: t.field({ type: GraphQLLocation, required: true }),
    mbid: t.field({ type: "UUID" }),
    tagIssues: t.string(),
  }),
});

builder.mutationField("updateAlbum", (t) =>
  t
    .withAuth({
      loggedIn: true,
    })
    .field({
      type: GraphQLAlbum,
      args: {
        artist: t.arg({ type: "String", required: true }),
        title: t.arg({ type: "String", required: true }),
        comments: t.arg({ type: "String" }),
        id: t.arg({ type: "UUID", required: true }),
        year: t.arg({ type: "Int" }),
        sources: t.arg({ type: [GraphQLSourceInput], required: true }),
        firstPlayed: t.arg({ type: GraphQLFirstPlayedInput }),
      },
      async resolve(
        _,
        { artist, comments, firstPlayed, id, sources, title, year },
      ) {
        return updateAlbum({
          artist,
          id,
          firstPlayed,
          title,
          comments,
          year,
          sources,
        });
      },
    }),
);
