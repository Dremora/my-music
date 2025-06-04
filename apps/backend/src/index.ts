import { ApolloServer } from "apollo-server";

import { apolloConfig } from "./apolloConfig";

const server = new ApolloServer(apolloConfig);

void server.listen().then(({ url }) => {
  console.info(`🚀 Server ready at ${url}`);
});
