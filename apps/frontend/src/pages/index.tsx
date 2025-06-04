import { useState } from "react";

import AlbumList from "components/AlbumList";
import Search from "components/Search";
import { useFindAlbumsQuery } from "generated/graphql";

function IndexPage() {
  const [searchText, setSearchText] = useState("");

  const { data } = useFindAlbumsQuery({
    skip: !searchText,
    variables: { filter: { query: searchText } },
  });

  return (
    <>
      <Search onChange={setSearchText} value={searchText} />
      {data ? <AlbumList albums={data.albums} /> : null}
    </>
  );
}

export default IndexPage;
