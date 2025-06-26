import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import WithInputPlugin from "@pothos/plugin-with-input";

import type { Context } from "api/context";

/* eslint-disable @typescript-eslint/naming-convention */
export const builder = new SchemaBuilder<{
  AuthScopes: {
    loggedIn: boolean;
    unauthenticated: boolean;
  };
  Context: Context;
  DefaultFieldNullability: false;
  Scalars: {
    UUID: {
      Input: string;
      Output: string;
    };
  };
}>({
  defaultFieldNullability: false,
  plugins: [ScopeAuthPlugin, WithInputPlugin],
  scopeAuth: {
    authScopes: (context) => ({
      unauthenticated: !context.loggedIn,
      loggedIn: context.loggedIn,
    }),
  },
});

builder.queryType({});
builder.mutationType({});
