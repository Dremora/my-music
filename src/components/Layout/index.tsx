import Link from "next/link";

import Footer from "components/Footer";
import Menu from "components/Menu";

import {
  h1Style,
  headerStyle,
  homeLinkStyle,
  pageStyle,
  sectionStyle,
} from "./styles.css";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className={pageStyle}>
      <div>
        <div className={sectionStyle}>
          <header className={headerStyle}>
            {/* eslint-disable-next-line react/forbid-component-props */}
            <Link className={homeLinkStyle} href="/">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}

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

export default Layout;
