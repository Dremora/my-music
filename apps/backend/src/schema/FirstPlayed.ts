import { objectType, unionType } from "nexus";

export const FirstPlayedTime = objectType({
  name: "FirstPlayedTime",
  definition(t) {
    t.int("timestamp");
  },
});

export const FirstPlayedDate = objectType({
  name: "FirstPlayedDate",
  definition(t) {
    t.nullable.int("day");
    t.nullable.int("month");
    t.int("year");
  },
});

export const FirstPlayed = unionType({
  name: "FirstPlayed",
  definition(t) {
    t.members("FirstPlayedDate", "FirstPlayedTime");
  },
  resolveType(value) {
    if ("timestamp" in value) {
      return "FirstPlayedTime";
    } else {
      return "FirstPlayedDate";
    }
  },
});
