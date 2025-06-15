import Album from "components/Album";
import { FindAlbumsQuery } from "generated/graphql";

type Props = {
  readonly albums: FindAlbumsQuery["albums"];
};

function AlbumList({ albums }: Props) {
  return (
    <div>
      {albums.map((album) => (
        <Album album={album} key={album.id} />
      ))}
    </div>
  );
}

export default AlbumList;
