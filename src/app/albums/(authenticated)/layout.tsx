"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import { useLogin } from "data/login";

export default function AlbumLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  const { isLoggedIn } = useLogin();

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
