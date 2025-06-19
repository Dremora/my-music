import Link from "next/link";
import type { ReactNode } from "react";

import { Footer } from "components/Footer";
import { Menu } from "components/Menu";

import {
  h1Style,
  headerStyle,
  homeLinkStyle,
  pageStyle,
  sectionStyle,
} from "./styles.css";

type Props = {
  readonly children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className={pageStyle}>
      <div>
        <div className={sectionStyle}>
          <header className={headerStyle}>
            <Link className={homeLinkStyle} href="/">
              <img alt="Logo" height={48} src="/logo.svg" />
              <h1 className={h1Style}>My Music</h1>
            </Link>
            <Menu />
          </header>
        </div>
        <div className={sectionStyle}>{children}</div>
      </div>
      <div className={sectionStyle}>
        <Footer />
      </div>
    </div>
  );
}
