"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useCallback } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";

import { Spacer } from "components/Spacer";
import { YearsHistogram } from "components/YearsHistogram/years-histogram";
import type { layoutFirstPlayedYearsQuery } from "generated/layoutFirstPlayedYearsQuery.graphql";

const layoutFirstPlayedYearsQuery = graphql`
  query layoutFirstPlayedYearsQuery {
    albumPerFirstPlayedYearCount {
      ...yearsHistogramFragment
    }
  }
`;

export default function FirstPlayedYearsLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  const router = useRouter();

  const navigateToYear = useCallback(
    (year: number) => {
      router.push(`/first-played/${year}`);
    },
    [router],
  );

  const data = useLazyLoadQuery<layoutFirstPlayedYearsQuery>(
    layoutFirstPlayedYearsQuery,
    {},
  );

  return (
    <>
      <YearsHistogram
        fragmentRef={data.albumPerFirstPlayedYearCount}
        onYearClick={navigateToYear}
      />
      <Spacer />
      {children}
    </>
  );
}
