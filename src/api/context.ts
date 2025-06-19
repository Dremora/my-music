import { PrismaClient } from "@prisma/client";

import { verifyAuthorizationHeader } from "./authentication";
import { prisma } from "./prisma";

export type Context = Readonly<{
  prisma: PrismaClient;
  loggedIn: boolean;
}>;

export function getContext({
  authorizationHeader,
}: Readonly<{ authorizationHeader: string }>): Context {
  return {
    prisma,
    loggedIn: verifyAuthorizationHeader(authorizationHeader),
  };
}
