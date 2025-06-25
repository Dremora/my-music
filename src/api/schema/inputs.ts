import { builder } from "./builder";

export const GraphQLFirstPlayedInput = builder.inputType("FirstPlayedInput", {
  fields: (t) => ({
    day: t.int(),
    month: t.int(),
    year: t.int(),
    timestamp: t.int(),
  }),
});
