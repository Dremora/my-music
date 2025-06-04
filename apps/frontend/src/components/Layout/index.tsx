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
            <Link href="/" passHref>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className={homeLinkStyle}>
                <img alt="Logo" height={48} src="/logo.svg" />
                <h1 className={h1Style}>My Music</h1>
              </a>
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
