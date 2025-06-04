import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

import Text from "components/Text";
import useIsFirstRender from "data/useIsFirstRender";

import { anchorStyle, barStyle, listItemStyle } from "./styles.css";

interface Props {
  href: string;
  children: string;
  onClick?: (() => void) | undefined;
}

function Item({ children, href, onClick }: Props) {
  const router = useRouter();
  const isFirstRender = useIsFirstRender();

  const current = router.pathname.startsWith(href);
  return (
    <li className={listItemStyle}>
      <Link href={href} passHref>
        {/* eslint-disable-next-line */}
        <a className={anchorStyle} onClick={onClick}>
          <Text color="grey" size="medium" weight="bold">
            {children}
          </Text>
        </a>
      </Link>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore https://github.com/framer/motion/pull/1573 */}
      <AnimatePresence>
        {current ? (
          <m.div
            animate={{ width: "100%" }}
            className={barStyle}
            exit={{ width: 0 }}
            initial={{ width: isFirstRender ? "100%" : 0 }}
            key="bar"
            transition={{ type: "tween", duration: 0.2 }}
          />
        ) : null}
      </AnimatePresence>
    </li>
  );
}

export default Item;
