import { useRouter } from "next/router";

import AlbumList from "components/AlbumList";
import AlbumsByYearSelector from "components/AlbumsByYearSelector";
import { Spacer } from "components/Spacer";
import { useFindAlbumsQuery } from "generated/graphql";

function YearsPage() {
  const router = useRouter();

  const year = parseInt(
    typeof router.query["year"] === "object"
      ? router.query["year"].join("")
      : router.query["year"] || "",
  );

  const { data } = useFindAlbumsQuery({
    skip: isNaN(year),
    variables: { filter: { year } },
  });

  return (
    <>
      <AlbumsByYearSelector />
      <Spacer />
      {data ? <AlbumList albums={data.albums} /> : null}
    </>
  );
}

export default YearsPage;
