import { VercelRequest, VercelResponse } from "@vercel/node";
import { ApolloServer } from "apollo-server-micro";

import { apolloConfig } from "../src/apolloConfig";

const allowCors =
  (fn: (req: VercelRequest, res: VercelResponse) => Promise<void>) =>
  (req: VercelRequest, res: VercelResponse) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://my-music.dremora.com"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
    res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    return fn(req, res);
  };

const server = new ApolloServer(apolloConfig);

const startServer = server.start();

export default allowCors(
  async (req: VercelRequest, res: VercelResponse): Promise<void> => {
    await startServer;
    await server.createHandler({
      path: "/graphql",
    })(req, res);
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};
