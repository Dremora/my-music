import {
  Environment,
  type FetchFunction,
  type GraphQLResponse,
  Network,
} from "relay-runtime";

const fetchGraphQL: FetchFunction = async (request, variables) => {
  // TODO use cookie
  const token =
    typeof localStorage === "undefined" ? null : localStorage.getItem("token");

  const resp = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token === null ? "" : `Bearer ${token}`,
    },
    body: JSON.stringify({ query: request.text, variables }),
  });

  if (!resp.ok) {
    throw new Error("Response failed.");
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, no-type-assertion/no-type-assertion
  return (await resp.json()) as GraphQLResponse;
};

export const environment = new Environment({
  network: Network.create(fetchGraphQL),
});
