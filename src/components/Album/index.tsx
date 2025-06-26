import Link from "next/link";
import { graphql, useFragment } from "react-relay";

import { Text } from "components/Text";
import { useLogin } from "data/login";
import type { AlbumFragment$key } from "generated/AlbumFragment.graphql";
import { formatFirstPlayed } from "utils";

import {
  anchorStyle,
  column1Style,
  column2Style,
  column3Style,
  firstPlayedStyle,
  rootStyle,
} from "./styles.css";

const albumFragment = graphql`
  fragment AlbumFragment on Album {
    id
    artist
    title
    year
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
  readonly albumRef: AlbumFragment$key;
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
        <Text color="grey" size="large" weight="bold">
          {album.title}
        </Text>

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
