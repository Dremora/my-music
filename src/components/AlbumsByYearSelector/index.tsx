import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";

import { YearsHistogram } from "components/YearsHistogram/years-histogram";
import type { AlbumsByYearSelectorQuery } from "generated/AlbumsByYearSelectorQuery.graphql";

export const albumsByYearSelectorQuery = graphql`
  query AlbumsByYearSelectorQuery {
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

  const data = useLazyLoadQuery<AlbumsByYearSelectorQuery>(
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
