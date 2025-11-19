import Link from "next/link";
import { graphql, useFragment } from "react-relay";

import type { AlbumType } from "@/generated/relay/albumFormFragment.graphql";
import type { albumFragment$key } from "@/generated/relay/albumFragment.graphql";
import { Text } from "components/text";
import { useLogin } from "data/login";
import { formatFirstPlayed } from "utils";

import { AppleLogo } from "./apple-logo";
import {
  addedStyle,
  albumTitleStyle,
  albumTypeStyle,
  anchorStyle,
  appleLogoWrapperStyle,
  column1Style,
  column2Style,
  column3Style,
  firstPlayedStyle,
  rootStyle,
} from "./styles.css";

const albumFragment = graphql`
  fragment albumFragment on Album {
    id
    artist
    title
    year
    type
    sources {
      location
    }
    firstPlayed {
      ... on FirstPlayedTimestamp {
        # eslint-disable-next-line relay/unused-fields
        timestamp
      }
      ... on FirstPlayedDate {
        year
        # eslint-disable-next-line relay/unused-fields
        month
        # eslint-disable-next-line relay/unused-fields
        day
      }
    }
  }
`;

type AlbumProps = {
  readonly albumRef: albumFragment$key;
};

export function Album({ albumRef }: AlbumProps) {
  const album = useFragment(albumFragment, albumRef);

  const { isLoggedIn } = useLogin();
  const firstPlayedFormatted = formatFirstPlayed(album.firstPlayed);

  const hasAppleMusic = album.sources.some(
    (source) => source.location === "APPLE_MUSIC",
  );

  const contents = (
    <>
      <div className={column1Style}>
        <Text color="lighterGrey" size="small">
          {album.year}
        </Text>
      </div>
      <div className={column2Style}>
        <div className={albumTitleStyle}>
          <Text color="grey" size="large" weight="bold">
            {album.title}
          </Text>
          {album.type && <AlbumType type={album.type} />}
        </div>
        <Text color="grey">{album.artist}</Text>
      </div>
      <div className={column3Style}>
        <div className={firstPlayedStyle}>
          <Text color="lighterGrey" size="small">
            {firstPlayedFormatted ? (
              <span>
                <span className={addedStyle}>ADDED:</span>{" "}
                {firstPlayedFormatted}
              </span>
            ) : null}
          </Text>
        </div>
        {hasAppleMusic && (
          <div className={appleLogoWrapperStyle}>
            <AppleLogo />
          </div>
        )}
      </div>
    </>
  );

  return isLoggedIn ? (
    <Link
      as={`/albums/${album.id}`}
      className={anchorStyle}
      href="/albums/[id]"
    >
      {contents}
    </Link>
  ) : (
    <div className={rootStyle}>{contents}</div>
  );
}

function AlbumType({ type }: { readonly type: AlbumType }) {
  const typeText = (() => {
    switch (type) {
      case "ALBUM": {
        return "Album";
      }

      case "COMPILATION": {
        return "Compilation";
      }

      case "EP": {
        return "EP";
      }

      case "LIVE": {
        return "Live";
      }

      case "SINGLE": {
        return "Single";
      }

      case "SOUNDTRACK": {
        return "Soundtrack";
      }
    }
  })();

  return (
    <div className={albumTypeStyle}>
      <Text caps color="white" size="xSmall" weight="bold">
        {typeText}
      </Text>
    </div>
  );
}
