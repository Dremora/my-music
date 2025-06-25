"use client";

import { use } from "react";

import { AlbumList } from "components/AlbumList";
import { useFindAlbumsQuery } from "generated/graphql";

export default function YearPage({
  params,
}: {
  readonly params: Promise<{ readonly year: string }>;
}) {
  const year = Number.parseInt(use(params).year);

  if (Number.isNaN(year)) {
    throw new TypeError("Invalid year");
  }

  const { data } = useFindAlbumsQuery({
    variables: { input: { year } },
  });

  return data ? <AlbumList albums={data.albums} /> : null;
}
