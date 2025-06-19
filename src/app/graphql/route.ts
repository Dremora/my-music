// https://the-guild.dev/graphql/yoga-server/docs/integrations/integration-with-nextjs

import { getContext } from "api/context";
import { yoga } from "api/http";

const { handleRequest } = yoga;

export async function GET(request: Request) {
  return handleRequest(
    request,
    getContext({
      authorizationHeader: request.headers.get("authorization") ?? "",
    }),
  );
}

export async function POST(request: Request) {
  return handleRequest(
    request,
    getContext({
      authorizationHeader: request.headers.get("authorization") ?? "",
    }),
  );
}

export async function OPTIONS(request: Request) {
  return handleRequest(
    request,
    getContext({
      authorizationHeader: request.headers.get("authorization") ?? "",
    }),
  );
}
