import { graphql, useFragment } from "react-relay";

import { Album } from "components/album";
import { Text } from "components/text";
import type { albumListFragment$key } from "generated/albumListFragment.graphql";

const albumListFragment = graphql`
  fragment albumListFragment on Album @relay(plural: true) {
    id
    ...albumFragment
  }
`;

type AlbumListProps = {
  readonly albumsRef: albumListFragment$key;
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
