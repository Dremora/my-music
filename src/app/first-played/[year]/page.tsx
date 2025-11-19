"use client";

import { useSearchParams } from "next/navigation";
import { use } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";

import type { pageFindAlbumsByFirstPlayedYearQuery } from "@/generated/relay/pageFindAlbumsByFirstPlayedYearQuery.graphql";
import { AlbumList } from "components/album-list";

const pageFindAlbumsByFirstPlayedYearQuery = graphql`
  query pageFindAlbumsByFirstPlayedYearQuery(
    $year: Int!
    $appleMusicFilter: Boolean
  ) {
    albumsByFirstPlayedYear(year: $year, appleMusicFilter: $appleMusicFilter) {
      ...albumListFragment
    }
  }
`;

export default function YearPage({
  params,
}: {
  readonly params: Promise<{ readonly year: string }>;
}) {
  const searchParams = useSearchParams();
  const year = Number.parseInt(use(params).year);
  const appleMusicParam = searchParams.get("appleMusic");

  const appleMusicFilter =
    appleMusicParam === "true"
      ? true
      : appleMusicParam === "false"
        ? false
        : undefined;

  if (Number.isNaN(year)) {
    throw new TypeError("Invalid year");
  }

  const data = useLazyLoadQuery<pageFindAlbumsByFirstPlayedYearQuery>(
    pageFindAlbumsByFirstPlayedYearQuery,
    {
      year,
      appleMusicFilter,
    },
  );

  return <AlbumList albumsRef={data.albumsByFirstPlayedYear} />;
}
