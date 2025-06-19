import { objectType } from "nexus";

import { loggedInField } from "./auth";

export const Source = objectType({
  name: "Source",
  sourceType: {
    module: "@prisma/client",
    export: "Source",
  },
  definition(t) {
    t.id("id", {
      resolve: (parent) => parent.id.toString(),
    });
    t.nullable.string("accurateRip");
    t.nullable.string("comments");
    t.nullable.string("cueIssues");
    t.nullable.int("discs");
    t.nullable.string("download", loggedInField);
    t.nullable.string("edition");
    t.nullable.field({
      name: "format",
      type: "Format",
    });
    t.field({
      name: "location",
      type: "Location",
    });
    t.nullable.uuid("mbid");
    t.nullable.string("tagIssues");
  },
});
