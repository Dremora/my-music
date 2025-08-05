// https://the-guild.dev/graphql/yoga-server/docs/integrations/integration-with-nextjs

import { yoga } from "api/yoga";

const { handleRequest } = yoga;

export async function GET(request: Request) {
  return handleRequest(request, {
    loggedIn: false,
  });
}

export async function OPTIONS(request: Request) {
  return handleRequest(request, {
    loggedIn: false,
  });
}

export async function POST(request: Request) {
  return handleRequest(request, {
    loggedIn: false,
  });
}
