import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { lexicographicSortSchema, printSchema } from "graphql";

import { builder } from "./builder";

import "./enums";
import "./mutations";
import "./queries";
import "./scalars";
import "./types";

export const schema = builder.toSchema();

if (process.env["NODE_ENV"] === "development") {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));

  writeFileSync(
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "../../../schema.graphql",
    ),
    schemaAsString,
  );
}
