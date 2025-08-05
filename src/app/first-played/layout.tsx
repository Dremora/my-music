"use client";

import { useRouter } from "next/navigation";
import { type ReactNode } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";

import type { layoutFirstPlayedYearsQuery } from "@/generated/relay/layoutFirstPlayedYearsQuery.graphql";
import { Spacer } from "components/spacer";
import { YearsHistogram } from "components/years-histogram/years-histogram";

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

  const navigateToYear = (year: number) => {
    router.push(`/first-played/${year}`);
  };

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
