import { builder } from "../builder";

export const GraphQLFirstPlayedTime = builder
  .objectRef<{
    timestamp: number;
  }>("FirstPlayedTime")
  .implement({
    fields: (t) => ({
      timestamp: t.exposeInt("timestamp"),
    }),
  });

export const GraphQLFirstPlayedDate = builder
  .objectRef<{
    day: number | null;
    month: number | null;
    year: number;
  }>("FirstPlayedDate")
  .implement({
    fields: (t) => ({
      day: t.exposeInt("day", { nullable: true }),
      month: t.exposeInt("month", { nullable: true }),
      year: t.exposeInt("year"),
    }),
  });

export const GraphQLFirstPlayed = builder.unionType("FirstPlayed", {
  types: () => [GraphQLFirstPlayedDate, GraphQLFirstPlayedTime],
  resolveType(value) {
    return "timestamp" in value
      ? GraphQLFirstPlayedTime
      : GraphQLFirstPlayedDate;
  },
});
