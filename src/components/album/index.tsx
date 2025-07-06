import Link from "next/link";
import { graphql, useFragment } from "react-relay";

import { Text } from "components/text";
import { useLogin } from "data/login";
import type { AlbumType } from "generated/albumFormFragment.graphql";
import type { albumFragment$key } from "generated/albumFragment.graphql";
import { formatFirstPlayed } from "utils";

import {
  albumTitleStyle,
  albumTypeStyle,
  anchorStyle,
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
  const firstPlayedFormatted = formatFirstPlayed(album.firstPlayed ?? null);

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
              <span>ADDED: {firstPlayedFormatted}</span>
            ) : null}
          </Text>
        </div>
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
