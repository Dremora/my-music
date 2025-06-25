"use client";

import { ApolloProvider } from "@apollo/client";
import type { ReactNode } from "react";

import { Layout } from "components/Layout";
import { LoginProvider } from "data/login";
import { client } from "utils/apollo";

export default function LayoutClient({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <Layout>{children}</Layout>
      </LoginProvider>
    </ApolloProvider>
  );
}
