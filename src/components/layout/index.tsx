import Link from "next/link";
import type { ReactNode } from "react";

import { Footer } from "components/footer";
import { Menu } from "components/menu";

import {
  h1Style,
  headerStyle,
  homeLinkStyle,
  pageStyle,
  sectionStyle,
} from "./styles.css";

type LayoutProps = {
  readonly children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className={pageStyle}>
      <div>
        <div className={sectionStyle}>
          <header className={headerStyle}>
            <Link className={homeLinkStyle} href="/">
              <svg
                height="48"
                viewBox="0 0 275 275"
                width="48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M137.5 275c75.94 0 137.5-61.56 137.5-137.5S213.44 0 137.5 0 0 61.56 0 137.5 61.56 275 137.5 275zM1.531 158.089A138.596 138.596 0 0 1 0 137.5C0 87.539 26.646 43.801 66.503 19.724h126.55c.385 0 .76.04 1.122.114 2.58.379 4.931 1.71 6.87 4.174 8.917 11.342 8.545 44.709 0 64.49-8.545 19.783-25.64 27.645-34.778 16.022-9.14-11.623-8.177-41.324 0-60.253 2.195-5.08 5.075-9.711 8.286-13.547H60.55C51.717 49.02 9.511 130.847 1.128 147.089h131.389c3.549-.263 6.808 1.018 9.353 4.255 8.918 11.342 8.545 44.708 0 64.49-8.545 19.783-25.639 27.645-34.778 16.022-9.139-11.623-8.176-41.324 0-60.253 2.189-5.066 5.058-9.685 8.259-13.514H1.531z"
                  fill="#E25D36"
                  fillRule="evenodd"
                  opacity=".81"
                />
              </svg>

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
