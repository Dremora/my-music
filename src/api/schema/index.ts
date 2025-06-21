import path from "node:path";

import { fieldAuthorizePlugin, makeSchema } from "nexus";

import { UnauthorizedError } from "api/errors";

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
        return new UnauthorizedError("Unauthorized to access the field");
      },
    }),
  ],
});
