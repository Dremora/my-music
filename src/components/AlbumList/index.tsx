import { Album } from "components/Album";
import type { FindAlbumsQuery } from "generated/graphql";

type AlbumListProps = {
  readonly albums: FindAlbumsQuery["albums"];
};

export function AlbumList({ albums }: AlbumListProps) {
  return (
    <div>
      {albums.map((album) => (
        <Album album={album} key={album.id} />
      ))}
    </div>
  );
}
