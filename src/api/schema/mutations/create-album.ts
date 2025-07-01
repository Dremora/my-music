import { createAlbum } from "api/domain/album";

import { builder } from "../builder";
import { GraphQLAlbumType, GraphQLFormat, GraphQLLocation } from "../enums";
import { GraphQLFirstPlayedInput } from "../inputs";
import { GraphQLAlbum } from "../types";

const GraphQLNewSourceInput = builder.inputType("NewSourceInput", {
  fields: (t) => ({
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

builder.mutationField("createAlbum", (t) =>
  t
    .withAuth({
      loggedIn: true,
    })
    .fieldWithInput({
      type: GraphQLAlbum,
      input: {
        artist: t.input.string({ required: true }),
        title: t.input.string({ required: true }),
        comments: t.input.string(),
        year: t.input.int(),
        type: t.input.field({ type: GraphQLAlbumType, required: true }),
        sources: t.input.field({
          type: [GraphQLNewSourceInput],
          required: true,
        }),
        firstPlayed: t.input.field({ type: GraphQLFirstPlayedInput }),
      },
      async resolve(
        _,
        {
          input: { artist, comments, firstPlayed, sources, title, type, year },
        },
      ) {
        return createAlbum({
          artist,
          firstPlayed: firstPlayed ?? null,
          title,
          comments: comments ?? null,
          year,
          type,
          sources,
        });
      },
    }),
);
