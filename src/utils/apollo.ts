import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import introspection from "possibleTypes";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext(
  (_, { headers }: Readonly<{ headers: Readonly<Record<string, string>> }>) => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        ...headers,
        authorization: token === null ? "" : `Bearer ${token}`,
      },
    };
  },
);

export const client = new ApolloClient({
  // eslint-disable-next-line unicorn/prefer-spread
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ possibleTypes: introspection.possibleTypes }),
});
