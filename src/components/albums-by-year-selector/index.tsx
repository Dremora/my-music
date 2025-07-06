import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";

import { YearsHistogram } from "components/years-histogram/years-histogram";
import type { albumsByYearSelectorQuery } from "generated/albumsByYearSelectorQuery.graphql";

const albumsByYearSelectorQuery = graphql`
  query albumsByYearSelectorQuery {
    albumPerYearCount {
      ...yearsHistogramFragment
    }
  }
`;

export function AlbumsByYearSelector() {
  const router = useRouter();

  const navigateToYear = useCallback(
    (year: number) => {
      router.push(`/years/${year}`);
    },
    [router],
  );

  const data = useLazyLoadQuery<albumsByYearSelectorQuery>(
    albumsByYearSelectorQuery,
    {},
  );

  return (
    <YearsHistogram
      fragmentRef={data.albumPerYearCount}
      onYearClick={navigateToYear}
    />
  );
}
