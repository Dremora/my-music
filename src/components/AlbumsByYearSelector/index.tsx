import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { YearsHistogram } from "components/YearsHistogram";
import { useAlbumPerYearCountQuery } from "generated/graphql";

export function AlbumsByYearSelector() {
  const router = useRouter();

  const navigateToYear = useCallback(
    (year: number) => {
      router.push(`/years/${year}`);
    },
    [router],
  );

  const { data, error, loading } = useAlbumPerYearCountQuery();

  if (loading || error || !data) {
    return null;
  }

  return (
    <YearsHistogram
      data={data.albumPerYearCount}
      onYearClick={navigateToYear}
    />
  );
}
