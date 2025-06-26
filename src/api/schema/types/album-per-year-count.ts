import { builder } from "../builder";

export const GraphQLAlbumPerYearCount = builder
  .objectRef<{
    count: number;
    year: number;
  }>("AlbumPerYearCount")
  .implement({
    fields: (t) => ({
      year: t.exposeInt("year"),
      count: t.exposeInt("count"),
    }),
  });
