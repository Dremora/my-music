import { useCSRFPrevention } from "@graphql-yoga/plugin-csrf-prevention";
import { useCookies } from "@whatwg-node/server-plugin-cookies";
import { GraphQLError } from "graphql";
import { createYoga, maskError } from "graphql-yoga";

import { type Context, getContext } from "./context";
import {
  BusinessRuleError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
  ValidationError,
} from "./errors";
import { schema } from "./schema";

export const yoga = createYoga<Context>({
  cors: false,
  schema,
  context: ({ request }) =>
    getContext({
      authorizationHeader: request.headers.get("authorization") ?? "",
    }),
  maskedErrors: {
    maskError(error, message, isDevelopment) {
      if (
        error instanceof GraphQLError &&
        (error.originalError instanceof BusinessRuleError ||
          error.originalError instanceof ValidationError ||
          error.originalError instanceof NotFoundError ||
          error.originalError instanceof UnauthorizedError ||
          error.originalError instanceof UnauthenticatedError)
      ) {
        return error;
      }

      return maskError(error, message, isDevelopment);
    },
  },
  plugins: [
    ...(process.env["NODE_ENV"] === "development" ? [] : [useCSRFPrevention()]),
    useCookies(),
  ],
  fetchAPI: { Response },
});
