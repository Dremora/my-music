"use client";

import { YearsHistogram } from "components/YearsHistogram";
import { useAlbumPerFirstPlayedYearCountQuery } from "generated/graphql";

export default function FirstPlayedYearsPage() {
  const { data, error, loading } = useAlbumPerFirstPlayedYearCountQuery();

  if (loading || error || !data) {
    return null;
  }

  return <YearsHistogram data={data.albumPerFirstPlayedYearCount} />;
}
