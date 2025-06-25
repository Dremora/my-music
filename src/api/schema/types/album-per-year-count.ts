import { builder } from "../builder";

export const GraphQLAlbumPerYearCount = builder
  .objectRef<{
    year: number;
    count: number;
  }>("AlbumPerYearCount")
  .implement({
    fields: (t) => ({
      year: t.exposeInt("year"),
      count: t.exposeInt("count"),
    }),
  });
