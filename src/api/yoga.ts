import { useCSRFPrevention } from "@graphql-yoga/plugin-csrf-prevention";
import { useDisableIntrospection } from "@graphql-yoga/plugin-disable-introspection";
import { useCookies } from "@whatwg-node/server-plugin-cookies";
import { GraphQLError } from "graphql";
import { createYoga, maskError, useReadinessCheck } from "graphql-yoga";
import { ZodError } from "zod";

import { type Context, getContext } from "./context";
import {
  BusinessRuleError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
  ValidationError,
} from "./errors";
import { checkReadiness } from "./prisma";
import { schema } from "./schema";

export const yoga = createYoga<Context>({
  landingPage: false,
  graphiql: process.env.NODE_ENV === "development",
  cors: false,
  schema,
  context: getContext,
  healthCheckEndpoint: "/health/live",
  maskedErrors: {
    maskError(error, message, isDevelopment) {
      if (
        error instanceof GraphQLError &&
        (error.originalError instanceof BusinessRuleError ||
          error.originalError instanceof ValidationError ||
          error.originalError instanceof NotFoundError ||
          error.originalError instanceof UnauthorizedError ||
          error.originalError instanceof UnauthenticatedError ||
          error.originalError instanceof ZodError)
      ) {
        return error;
      }

      return maskError(error, message, isDevelopment);
    },
  },
  plugins: [
    ...(process.env["NODE_ENV"] === "development"
      ? []
      : [useCSRFPrevention(), useDisableIntrospection()]),
    useReadinessCheck({
      endpoint: "/health/ready",
      check: async () => {
        return checkReadiness();
      },
    }),
    useCookies(),
  ],
});
