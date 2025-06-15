import { AnimatePresence, motion } from "motion/react";
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
      <Link
        // eslint-disable-next-line react/forbid-component-props
        className={anchorStyle}
        href={href}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(onClick ? { onClick } : {})}
      >
        {/* eslint-disable-next-line */}

        <Text color="grey" size="medium" weight="bold">
          {children}
        </Text>
      </Link>
      <AnimatePresence>
        {current ? (
          <motion.div
            animate={{ width: "100%" }}
            className={barStyle}
            exit={{ width: 0 }}
            initial={{ width: isFirstRender ? "100%" : 0 }}
            transition={{ type: "tween", duration: 0.2 }}
          />
        ) : null}
      </AnimatePresence>
    </li>
  );
}

export default Item;
