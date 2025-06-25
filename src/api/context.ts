import { verifyAuthorizationHeader } from "./authentication";

export type Context = Readonly<{
  loggedIn: boolean;
}>;

export function getContext({
  authorizationHeader,
}: Readonly<{ authorizationHeader: string }>): Context {
  return {
    loggedIn: verifyAuthorizationHeader(authorizationHeader),
  };
}
