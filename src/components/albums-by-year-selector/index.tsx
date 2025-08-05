import { useRouter } from "next/navigation";
import { graphql, useLazyLoadQuery } from "react-relay";

import type { albumsByYearSelectorQuery } from "@/generated/relay/albumsByYearSelectorQuery.graphql";
import { YearsHistogram } from "components/years-histogram/years-histogram";

const albumsByYearSelectorQuery = graphql`
  query albumsByYearSelectorQuery {
    albumPerYearCount {
      ...yearsHistogramFragment
    }
  }
`;

export function AlbumsByYearSelector() {
  const router = useRouter();

  const navigateToYear = (year: number) => {
    router.push(`/years/${year}`);
  };

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
