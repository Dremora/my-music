import { graphql, useFragment } from "react-relay";

import { Album } from "components/Album";
import { Text } from "components/Text";
import type { AlbumListFragment$key } from "generated/AlbumListFragment.graphql";

const albumListFragment = graphql`
  fragment AlbumListFragment on Album @relay(plural: true) {
    id
    ...AlbumFragment
  }
`;

type AlbumListProps = {
  readonly albumsRef: AlbumListFragment$key;
};

export function AlbumList({ albumsRef }: AlbumListProps) {
  const albums = useFragment(albumListFragment, albumsRef);

  return (
    <div>
      {albums.length > 0 ? (
        albums.map((album) => <Album albumRef={album} key={album.id} />)
      ) : (
        <div>
          <Text color="grey" weight="bold">
            No albums found.
          </Text>
        </div>
      )}
    </div>
  );
}
