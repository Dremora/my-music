import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";

import type { albumsByYearSelectorQuery } from "@/generated/relay/albumsByYearSelectorQuery.graphql";
import { AppleMusicFilter } from "components/apple-music-filter";
import { Spacer } from "components/spacer";
import { YearsHistogram } from "components/years-histogram/years-histogram";

const albumsByYearSelectorQuery = graphql`
  query albumsByYearSelectorQuery($appleMusicFilter: Boolean) {
    albumPerYearCount(appleMusicFilter: $appleMusicFilter) {
      ...yearsHistogramFragment
    }
  }
`;

export function AlbumsByYearSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const appleMusicParam = searchParams.get("appleMusic");

  // Extract year from pathname if we're on a year page (e.g., /years/1997)
  const yearMatch = /^\/years\/(\d+)$/.exec(pathname);
  const currentYear = yearMatch ? yearMatch[1] : null;

  const currentAppleMusicFilter =
    appleMusicParam === "true"
      ? true
      : appleMusicParam === "false"
        ? false
        : null;

  const [appleMusicFilter, setAppleMusicFilter] = useState<boolean | null>(
    currentAppleMusicFilter,
  );

  const navigateToYear = useCallback(
    (year: number) => {
      const params = new URLSearchParams();

      if (appleMusicFilter !== null) {
        params.set("appleMusic", appleMusicFilter ? "true" : "false");
      }

      const queryString = params.toString();
      router.push(`/years/${year}${queryString ? `?${queryString}` : ""}`);
    },
    [appleMusicFilter, router],
  );

  const handleAppleMusicFilterChange = useCallback(
    (filter: boolean | null) => {
      setAppleMusicFilter(filter);

      const params = new URLSearchParams();

      if (filter !== null) {
        params.set("appleMusic", filter ? "true" : "false");
      }

      const queryString = params.toString();

      // Preserve the year if we're on a year page
      if (currentYear != null) {
        router.push(
          `/years/${currentYear}${queryString ? `?${queryString}` : ""}`,
        );
      } else {
        const newUrl = queryString ? `/years?${queryString}` : "/years";
        router.push(newUrl);
      }
    },
    [currentYear, router],
  );

  const data = useLazyLoadQuery<albumsByYearSelectorQuery>(
    albumsByYearSelectorQuery,
    {
      appleMusicFilter: appleMusicFilter ?? undefined,
    },
  );

  return (
    <>
      <AppleMusicFilter
        onChange={handleAppleMusicFilterChange}
        value={appleMusicFilter}
      />
      <Spacer />
      <YearsHistogram
        fragmentRef={data.albumPerYearCount}
        onYearClick={navigateToYear}
      />
    </>
  );
}
