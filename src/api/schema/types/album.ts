import { getUnixTime } from "date-fns";

import type { Album } from "api/generated/prisma";
import { prisma } from "api/prisma";

import { builder } from "../builder";

import { GraphQLFirstPlayed } from "./first-played";
import { GraphQLSource } from "./source";

export const GraphQLAlbum = builder.objectRef<Album>("Album").implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    artist: t.exposeString("artist"),
    comments: t.exposeString("comments", { nullable: true }),
    year: t.exposeInt("year", { nullable: true }),
    firstPlayed: t.field({
      type: GraphQLFirstPlayed,
      nullable: true,
      resolve: (parent) => {
        if (parent.firstPlayedTimestamp) {
          return {
            timestamp: getUnixTime(parent.firstPlayedTimestamp),
          };
        } else if (parent.firstPlayedDate[0] === undefined) {
          return null;
        } else {
          return {
            year: parent.firstPlayedDate[0],
            month: parent.firstPlayedDate[1] ?? null,
            day: parent.firstPlayedDate[2] ?? null,
          };
        }
      },
    }),

    sources: t.field({
      type: [GraphQLSource],
      resolve: async (parent) => {
        return prisma.source.findMany({
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
    }),
  }),
});
