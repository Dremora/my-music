import { builder } from "../builder";

const GraphQLFirstPlayedTimestamp = builder
  .objectRef<{
    timestamp: number;
  }>("FirstPlayedTimestamp")
  .implement({
    fields: (t) => ({
      timestamp: t.exposeInt("timestamp"),
    }),
  });

const GraphQLFirstPlayedDate = builder
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
  types: () => [GraphQLFirstPlayedDate, GraphQLFirstPlayedTimestamp],
  resolveType(value) {
    return "timestamp" in value
      ? GraphQLFirstPlayedTimestamp
      : GraphQLFirstPlayedDate;
  },
});
