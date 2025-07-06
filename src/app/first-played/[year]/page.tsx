"use client";

import { use } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";

import { AlbumList } from "components/album-list";
import type { pageFindAlbumsByFirstPlayedYearQuery } from "generated/pageFindAlbumsByFirstPlayedYearQuery.graphql";

const pageFindAlbumsByFirstPlayedYearQuery = graphql`
  query pageFindAlbumsByFirstPlayedYearQuery($year: Int!) {
    albumsByFirstPlayedYear(year: $year) {
      ...albumListFragment
    }
  }
`;

export default function YearPage({
  params,
}: {
  readonly params: Promise<{ readonly year: string }>;
}) {
  const year = Number.parseInt(use(params).year);

  if (Number.isNaN(year)) {
    throw new TypeError("Invalid year");
  }

  const data = useLazyLoadQuery<pageFindAlbumsByFirstPlayedYearQuery>(
    pageFindAlbumsByFirstPlayedYearQuery,
    {
      year,
    },
  );

  return <AlbumList albumsRef={data.albumsByFirstPlayedYear} />;
}
