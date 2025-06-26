import { graphql, useFragment } from "react-relay";

import { Album } from "components/Album";
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
      {albums.map((album) => (
        <Album albumRef={album} key={album.id} />
      ))}
    </div>
  );
}
