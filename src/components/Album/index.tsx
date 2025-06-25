import Link from "next/link";

import { Text } from "components/Text";
import { useLogin } from "data/login";
import type { FindAlbumsQuery } from "generated/graphql";
import { formatFirstPlayed } from "utils";

import {
  anchorStyle,
  column1Style,
  column2Style,
  column3Style,
  firstPlayedStyle,
  rootStyle,
} from "./styles.css";

type AlbumProps = {
  readonly album: FindAlbumsQuery["albums"][number];
};

export function Album({ album }: AlbumProps) {
  const { isLoggedIn } = useLogin();
  const firstPlayedFormatted = formatFirstPlayed(album.firstPlayed);

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
