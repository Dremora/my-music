import { objectType } from "nexus";

export const AlbumPerYearCount = objectType({
  name: "AlbumPerYearCount",
  definition(t) {
    t.int("year");
    t.int("count");
  },
});
