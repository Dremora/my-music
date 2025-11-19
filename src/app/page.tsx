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
import { AppleMusicFilter } from "components/apple-music-filter";
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
  const router = useRouter();
  const currentSearchQuery = decodeURIComponent(searchParams.get("q") ?? "");
  const appleMusicParam = searchParams.get("appleMusic");

  const currentAppleMusicFilter =
    appleMusicParam === "true"
      ? true
      : appleMusicParam === "false"
        ? false
        : null;

  const [searchText, setSearchText] = useState(currentSearchQuery);

  const [appleMusicFilter, setAppleMusicFilter] = useState<boolean | null>(
    currentAppleMusicFilter,
  );

  const isInitialRender = useIsFirstRender();

  const [queryLoading, setQueryLoading] =
    useState<PreloadedQuery<pageFindAlbumsBySearchQuery> | null>(null);

  const [queryRendering, setQueryRendering] =
    useState<PreloadedQuery<pageFindAlbumsBySearchQuery> | null>(null);

  const isTypingTimeout = useRef<NodeJS.Timeout | null>(null);

  const queryLoadingRef =
    useRef<PreloadedQuery<pageFindAlbumsBySearchQuery> | null>(null);

  const queryRenderingRef =
    useRef<PreloadedQuery<pageFindAlbumsBySearchQuery> | null>(null);

  // Keep refs in sync with state
  useEffect(() => {
    queryLoadingRef.current = queryLoading;
  }, [queryLoading]);

  useEffect(() => {
    queryRenderingRef.current = queryRendering;
  }, [queryRendering]);

  const runQuery = useCallback(
    (newSearchText: string, filter: boolean | null) => {
      const query = newSearchText
        ? loadQuery<pageFindAlbumsBySearchQuery>(
            environment,
            pageFindAlbumsBySearchQuery,
            {
              input: {
                query: newSearchText,
                appleMusicFilter: filter ?? undefined,
              },
            },
            { fetchPolicy: "network-only" },
          )
        : null;

      if (queryLoadingRef.current) {
        queryLoadingRef.current.dispose();
      }

      setQueryLoading(query);

      if (queryRenderingRef.current && !query) {
        queryRenderingRef.current.dispose();
        setQueryRendering(null);
      }
    },
    [],
  );

  const handleSearch = useCallback(
    (newSearchText: string) => {
      setSearchText(newSearchText);

      const params = new URLSearchParams();

      if (newSearchText) {
        params.set("q", newSearchText);
      }

      if (appleMusicFilter !== null) {
        params.set("appleMusic", appleMusicFilter ? "true" : "false");
      }

      const newUrl = params.toString() ? `/?${params.toString()}` : "/";

      if (currentSearchQuery !== newSearchText) {
        if (isTypingTimeout.current) {
          router.replace(newUrl);

          clearTimeout(isTypingTimeout.current);
          isTypingTimeout.current = null;
        } else {
          router.push(newUrl);
        }

        isTypingTimeout.current = setTimeout(() => {
          isTypingTimeout.current = null;
        }, 1000);
      }

      runQuery(newSearchText, appleMusicFilter);
    },
    [appleMusicFilter, currentSearchQuery, router, runQuery],
  );

  const handleAppleMusicFilterChange = useCallback(
    (filter: boolean | null) => {
      setAppleMusicFilter(filter);

      const params = new URLSearchParams();

      if (searchText) {
        params.set("q", searchText);
      }

      if (filter !== null) {
        params.set("appleMusic", filter ? "true" : "false");
      }

      const newUrl = params.toString() ? `/?${params.toString()}` : "/";
      router.push(newUrl);

      runQuery(searchText, filter);
    },
    [router, runQuery, searchText],
  );

  useLayoutEffect(() => {
    if (!isInitialRender) {
      return;
    }

    // On initial render, set up the URL and run the query
    const params = new URLSearchParams();

    if (searchText) {
      params.set("q", searchText);
    }

    if (appleMusicFilter !== null) {
      params.set("appleMusic", appleMusicFilter ? "true" : "false");
    }

    const newUrl = params.toString() ? `/?${params.toString()}` : "/";

    if (newUrl !== window.location.pathname + window.location.search) {
      router.replace(newUrl);
    }

    if (searchText) {
      runQuery(searchText, appleMusicFilter);
    }
  }, [appleMusicFilter, isInitialRender, router, runQuery, searchText]);

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
      <AppleMusicFilter
        onChange={handleAppleMusicFilterChange}
        value={appleMusicFilter}
      />
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
