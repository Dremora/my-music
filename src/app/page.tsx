"use client";

import { Suspense, useState } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";

import { AlbumList } from "components/AlbumList";
import { Search } from "components/Search";
import type { pageFindAlbumsBySearchQuery } from "generated/pageFindAlbumsBySearchQuery.graphql";

const pageFindAlbumsBySearchQuery = graphql`
  query pageFindAlbumsBySearchQuery($input: QueryAlbumsInput!) {
    albums(input: $input) {
      ...AlbumListFragment
    }
  }
`;

export default function IndexPage() {
  const [searchText, setSearchText] = useState("");

  const data = useLazyLoadQuery<pageFindAlbumsBySearchQuery>(
    pageFindAlbumsBySearchQuery,
    {
      input: { query: searchText },
    },
  );

  return (
    <Suspense>
      <Search onChange={setSearchText} value={searchText} />
      <AlbumList albumsRef={data.albums} />
    </Suspense>
  );
}
