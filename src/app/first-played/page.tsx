"use client";

import { graphql, useLazyLoadQuery } from "react-relay";

import { YearsHistogram } from "components/YearsHistogram/years-histogram";
import type { pageFirstPlayedYearsQuery } from "generated/pageFirstPlayedYearsQuery.graphql";

const pageFirstPlayedYearsQuery = graphql`
  query pageFirstPlayedYearsQuery {
    albumPerFirstPlayedYearCount {
      ...yearsHistogramFragment
    }
  }
`;

export default function FirstPlayedYearsPage() {
  const data = useLazyLoadQuery<pageFirstPlayedYearsQuery>(
    pageFirstPlayedYearsQuery,
    {},
  );

  return <YearsHistogram fragmentRef={data.albumPerFirstPlayedYearCount} />;
}
