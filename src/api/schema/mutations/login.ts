import { verify } from "../../authentication";
import { builder } from "../builder";

builder.mutationField("login", (t) =>
  t
    .withAuth({
      unauthenticated: true,
    })
    .field({
      type: "Boolean",
      args: {
        password: t.arg({ type: "String", required: true }),
      },
      resolve(_, { password }) {
        return verify(password);
      },
    }),
);
