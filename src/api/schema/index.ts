import path from "node:path";

import { ForbiddenError } from "apollo-server";
import { fieldAuthorizePlugin, makeSchema } from "nexus";

import * as types from "./types";

const dirname = path.dirname(new URL(import.meta.url).pathname);

export const schema = makeSchema({
  types,
  contextType: {
    module: path.join(dirname, "..", "context.ts"),
    export: "Context",
  },
  nonNullDefaults: {
    input: true,
    output: true,
  },
  outputs: {
    typegen: path.join(dirname, "..", "nexus-typegen.ts"),
    schema: path.join(dirname, "..", "schema.graphql"),
  },
  plugins: [
    fieldAuthorizePlugin({
      formatError: () => {
        return new ForbiddenError("Unauthorized to access the field");
      },
    }),
  ],
});
