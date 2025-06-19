import { Album } from "components/Album";
import type { FindAlbumsQuery } from "generated/graphql";

type Props = {
  readonly albums: FindAlbumsQuery["albums"];
};

export function AlbumList({ albums }: Props) {
  return (
    <div>
      {albums.map((album) => (
        <Album album={album} key={album.id} />
      ))}
    </div>
  );
}
