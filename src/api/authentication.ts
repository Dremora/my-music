import { getEnvVariable } from "./config";

export function verify(token: string): boolean {
  return token === getEnvVariable("USER_PASSWORD");
}

export function verifyAuthorizationHeader(
  authorizationHeader: string | undefined,
): boolean {
  if (typeof authorizationHeader !== "string") {
    return false;
  }

  const [type, token] = authorizationHeader.split(" ");

  if (type !== "Bearer" || typeof token !== "string") {
    return false;
  }

  return verify(token);
}
