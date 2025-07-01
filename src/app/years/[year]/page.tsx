"use client";

import { use } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";

import { AlbumList } from "components/AlbumList";
import type { pageFindAlbumsByYearQuery } from "generated/pageFindAlbumsByYearQuery.graphql";

const pageFindAlbumsByYearQuery = graphql`
  query pageFindAlbumsByYearQuery($year: Int!) {
    albumsByYear(year: $year) {
      ...AlbumListFragment
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

  const data = useLazyLoadQuery<pageFindAlbumsByYearQuery>(
    pageFindAlbumsByYearQuery,
    {
      year,
    },
  );

  return <AlbumList albumsRef={data.albumsByYear} />;
}
