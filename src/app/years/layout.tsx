"use client";

import type { ReactNode } from "react";

import { AlbumsByYearSelector } from "components/albums-by-year-selector";
import { Spacer } from "components/spacer";

export default function YearsLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <>
      <AlbumsByYearSelector />
      <Spacer />
      {children}
    </>
  );
}
