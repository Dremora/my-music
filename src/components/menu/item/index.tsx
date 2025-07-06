import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Text } from "components/text";
import { useIsFirstRender } from "data/use-is-first-render";

import { anchorStyle, barStyle, listItemStyle } from "./styles.css";

type MenuItemProps = {
  readonly children: string;
  readonly href: string;
  readonly onClick?: (() => void) | undefined;
};

export function Item({ children, href, onClick }: MenuItemProps) {
  const pathname = usePathname();
  const isFirstRender = useIsFirstRender();

  const current = pathname.startsWith(href);

  return (
    <li className={listItemStyle}>
      <Link
        className={anchorStyle}
        href={href}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(onClick ? { onClick } : {})}
      >
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
