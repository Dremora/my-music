import { IncomingMessage } from "http";

import { PrismaClient } from "@prisma/client";

import { verifyAuthorizationHeader } from "./authentication";
import { prisma } from "./prisma";

export interface Context {
  prisma: PrismaClient;
  loggedIn: boolean;
}

export const createContext = ({ req }: { req: IncomingMessage }): Context => {
  return {
    prisma,
    loggedIn: verifyAuthorizationHeader(req.headers.authorization),
  };
};
