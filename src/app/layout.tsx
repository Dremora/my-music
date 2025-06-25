import "styles/global.css";

import type { Metadata } from "next";
import { Lato } from "next/font/google";
import type { ReactNode } from "react";

import LayoutClient from "./layout.client";

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <html className={lato.className} lang="en">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "My Music",
};
