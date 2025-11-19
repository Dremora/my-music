"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ReactNode, useCallback, useState } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";

import type { layoutFirstPlayedYearsQuery } from "@/generated/relay/layoutFirstPlayedYearsQuery.graphql";
import { AppleMusicFilter } from "components/apple-music-filter";
import { Spacer } from "components/spacer";
import { YearsHistogram } from "components/years-histogram/years-histogram";

const layoutFirstPlayedYearsQuery = graphql`
  query layoutFirstPlayedYearsQuery($appleMusicFilter: Boolean) {
    albumPerFirstPlayedYearCount(appleMusicFilter: $appleMusicFilter) {
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const appleMusicParam = searchParams.get("appleMusic");

  // Extract year from pathname if we're on a year page (e.g., /first-played/1997)
  const yearMatch = /^\/first-played\/(\d+)$/.exec(pathname);
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

      router.push(
        `/first-played/${year}${queryString ? `?${queryString}` : ""}`,
      );
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
          `/first-played/${currentYear}${queryString ? `?${queryString}` : ""}`,
        );
      } else {
        const newUrl = queryString
          ? `/first-played?${queryString}`
          : "/first-played";

        router.push(newUrl);
      }
    },
    [currentYear, router],
  );

  const data = useLazyLoadQuery<layoutFirstPlayedYearsQuery>(
    layoutFirstPlayedYearsQuery,
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
        fragmentRef={data.albumPerFirstPlayedYearCount}
        onYearClick={navigateToYear}
      />
      <Spacer />
      {children}
    </>
  );
}
