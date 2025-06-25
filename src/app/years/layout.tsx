"use client";

import type { ReactNode } from "react";

import { AlbumsByYearSelector } from "components/AlbumsByYearSelector";
import { Spacer } from "components/Spacer";

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
