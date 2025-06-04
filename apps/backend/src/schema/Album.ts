import { getUnixTime } from "date-fns";
import { list, objectType } from "nexus";

export const Album = objectType({
  name: "Album",
  sourceType: {
    module: "@prisma/client",
    export: "Album",
  },
  definition(t) {
    t.uuid("id");
    t.string("title");
    t.string("artist");
    t.nullable.string("comments");
    t.nullable.int("year");
    t.nullable.field({
      name: "firstPlayed",
      type: "FirstPlayed",
      resolve(parent) {
        if (parent.firstPlayedTimestamp) {
          return {
            timestamp: getUnixTime(parent.firstPlayedTimestamp),
          };
        } else if (parent.firstPlayedDate && parent.firstPlayedDate[0]) {
          return {
            year: parent.firstPlayedDate[0],
            month: parent.firstPlayedDate[1] ?? null,
            day: parent.firstPlayedDate[2] ?? null,
          };
        } else {
          return null;
        }
      },
    });

    t.field("sources", {
      type: list("Source"),
      resolve(parent, _, ctx) {
        return ctx.prisma.source.findMany({
          where: {
            album: {
              id: parent.id,
            },
          },
          orderBy: {
            id: "asc",
          },
        });
      },
    });
  },
});
