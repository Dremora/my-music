import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import introspection from "possibleTypes";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext(
  (_, { headers }: { headers: Record<string, string> }) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  },
);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ possibleTypes: introspection.possibleTypes }),
});

export default client;
