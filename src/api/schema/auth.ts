import type { Context } from "../context";

export const loggedInField = {
  authorize: (_: unknown, _2: unknown, ctx: Context) => ctx.loggedIn,
};
