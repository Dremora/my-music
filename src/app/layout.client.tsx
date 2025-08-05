"use client";

import type { ReactNode } from "react";
import { RelayEnvironmentProvider } from "react-relay";

import { Layout } from "components/layout";
import { LoginProvider } from "data/login";
import { useIsFirstRenderForceRender } from "data/use-is-first-render";
import { environment } from "utils/relay";

export default function LayoutClient({
  children,
}: {
  readonly children: ReactNode;
}) {
  const isFirstRender = useIsFirstRenderForceRender();

  if (isFirstRender) {
    return null;
  }

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <RelayEnvironmentProvider environment={environment}>
      <LoginProvider>
        <Layout>{children}</Layout>
      </LoginProvider>
    </RelayEnvironmentProvider>
  );
}
