import type { SourceModel } from "@/generated/prisma/models/Source";

import { builder } from "../builder";
import { GraphQLFormat, GraphQLLocation } from "../enums";

export const GraphQLSource = builder
  .objectRef<SourceModel>("Source")
  .implement({
    fields: (t) => ({
      id: t.field({
        type: "ID",
        resolve: (parent) => parent.id.toString(),
      }),
      accurateRip: t.exposeString("accurateRip", { nullable: true }),
      comments: t.exposeString("comments", { nullable: true }),
      cueIssues: t.exposeString("cueIssues", { nullable: true }),
      discs: t.exposeInt("discs", { nullable: true }),
      download: t.exposeString("download", { nullable: true }),
      edition: t.exposeString("edition", { nullable: true }),
      format: t.field({
        type: GraphQLFormat,
        nullable: true,
        resolve: (parent) => parent.format,
      }),
      location: t.field({
        type: GraphQLLocation,
        resolve: (parent) => parent.location,
      }),
      mbid: t.field({
        type: "UUID",
        nullable: true,
        resolve: (parent) => parent.mbid?.toString(),
      }),
      tagIssues: t.exposeString("tagIssues", { nullable: true }),
    }),
  });
