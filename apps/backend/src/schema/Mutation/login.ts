import { mutationField } from "nexus";

import { verify } from "../../authentication";

export const login = mutationField("login", {
  type: "Boolean",
  args: {
    password: "String",
  },
  resolve(_, { password }) {
    return verify(password);
  },
});
