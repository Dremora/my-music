import { Context } from "../context";

export const loggedInField = {
  authorize: (_: unknown, __: unknown, ctx: Context) => ctx.loggedIn,
};
