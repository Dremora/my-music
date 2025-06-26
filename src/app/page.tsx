"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import {
  graphql,
  loadQuery,
  type PreloadedQuery,
  usePreloadedQuery,
} from "react-relay/hooks";

import { AlbumList } from "components/AlbumList";
import { Search } from "components/Search";
import { Text } from "components/Text";
import type { pageFindAlbumsBySearchQuery } from "generated/pageFindAlbumsBySearchQuery.graphql";
import { environment } from "utils/relay";

const pageFindAlbumsBySearchQuery = graphql`
  query pageFindAlbumsBySearchQuery($input: QueryAlbumsInput!) {
    albums(input: $input) {
      ...AlbumListFragment
    }
  }
`;

type LoadingQueryProps = {
  readonly onLoad: (
    queryRef: PreloadedQuery<pageFindAlbumsBySearchQuery>,
  ) => void;
  readonly queryRef: PreloadedQuery<pageFindAlbumsBySearchQuery>;
};

export default function IndexPage() {
  const [searchText, setSearchText] = useState("");

  const [queryLoading, setQueryLoading] =
    useState<PreloadedQuery<pageFindAlbumsBySearchQuery> | null>(null);

  const [queryRendering, setQueryRendering] =
    useState<PreloadedQuery<pageFindAlbumsBySearchQuery> | null>(null);

  const handleSearch = useCallback(
    (newSearchText: string) => {
      setSearchText(newSearchText);

      const query = newSearchText
        ? loadQuery<pageFindAlbumsBySearchQuery>(
            environment,
            pageFindAlbumsBySearchQuery,
            { input: { query: newSearchText } },
            { fetchPolicy: "network-only" },
          )
        : null;

      if (queryLoading) {
        queryLoading.dispose();
      }

      setQueryLoading(query);

      if (queryRendering && !query) {
        queryRendering.dispose();
        setQueryRendering(null);
      }
    },
    [queryLoading, queryRendering],
  );

  const handleQueryLoad = useCallback(() => {
    if (queryRendering) {
      queryRendering.dispose();
    }

    setQueryRendering(queryLoading);
    setQueryLoading(null);
  }, [queryLoading, queryRendering]);

  return (
    <>
      <Search onChange={handleSearch} value={searchText} />
      {!queryRendering && queryLoading && (
        <div>
          <Text color="grey" weight="bold">
            Loading albums...
          </Text>
        </div>
      )}

      {queryRendering && (
        <Suspense>
          <AlbumListWrapper queryRef={queryRendering} />
        </Suspense>
      )}
      {queryLoading && (
        <Suspense>
          <LoadingQuery onLoad={handleQueryLoad} queryRef={queryLoading} />
        </Suspense>
      )}
    </>
  );
}

function AlbumListWrapper({
  queryRef,
}: {
  readonly queryRef: PreloadedQuery<pageFindAlbumsBySearchQuery>;
}) {
  const data = usePreloadedQuery(pageFindAlbumsBySearchQuery, queryRef);

  return <AlbumList albumsRef={data.albums} />;
}

function LoadingQuery({ onLoad, queryRef }: LoadingQueryProps) {
  usePreloadedQuery(pageFindAlbumsBySearchQuery, queryRef);

  useEffect(() => {
    onLoad(queryRef);
  }, [queryRef, onLoad]);

  return null;
}
