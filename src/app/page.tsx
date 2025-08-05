"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  graphql,
  loadQuery,
  type PreloadedQuery,
  usePreloadedQuery,
} from "react-relay/hooks";

import type { pageFindAlbumsBySearchQuery } from "@/generated/relay/pageFindAlbumsBySearchQuery.graphql";
import { AlbumList } from "components/album-list";
import { Search } from "components/search";
import { Text } from "components/text";
import { useIsFirstRender } from "data/use-is-first-render";
import { environment } from "utils/relay";

const pageFindAlbumsBySearchQuery = graphql`
  query pageFindAlbumsBySearchQuery($input: QueryAlbumsInput!) {
    albums(input: $input) {
      ...albumListFragment
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
  const searchParams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { push, replace } = useRouter();
  const currentSearchQuery = decodeURIComponent(searchParams.get("q") ?? "");
  const [searchText, setSearchText] = useState(currentSearchQuery);
  const isInitialRender = useIsFirstRender();

  const [queryLoading, setQueryLoading] =
    useState<PreloadedQuery<pageFindAlbumsBySearchQuery> | null>(null);

  const [queryRendering, setQueryRendering] =
    useState<PreloadedQuery<pageFindAlbumsBySearchQuery> | null>(null);

  const isTypingTimeout = useRef<NodeJS.Timeout | null>(null);

  const runQuery = useCallback(
    (newSearchText: string) => {
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

  const handleSearch = useCallback(
    (newSearchText: string) => {
      setSearchText(newSearchText);

      if (currentSearchQuery !== newSearchText) {
        const newUrl = newSearchText
          ? `/?q=${encodeURIComponent(newSearchText)}`
          : "/";

        if (isTypingTimeout.current) {
          replace(newUrl);

          clearTimeout(isTypingTimeout.current);
          isTypingTimeout.current = null;
        } else {
          push(newUrl);
        }

        isTypingTimeout.current = setTimeout(() => {
          isTypingTimeout.current = null;
        }, 1000);
      }

      runQuery(newSearchText);
    },
    [currentSearchQuery, push, replace, runQuery],
  );

  useLayoutEffect(() => {
    if (!isInitialRender) {
      return;
    }

    handleSearch(searchText);
  }, [handleSearch, isInitialRender, searchText]);

  const handleQueryLoad = () => {
    if (queryRendering) {
      queryRendering.dispose();
    }

    setQueryRendering(queryLoading);
    setQueryLoading(null);
  };

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
