import { motion, transform } from "motion/react";
import { memo, useCallback, useMemo } from "react";

import { grey, lightGrey, lighterGrey } from "styles/colors.css";

import { barStyle, rootStyle } from "./styles.css";

interface Props {
  year: number;
  count: number;
  maxCount: number;
  onHoverStart: (year: number) => (e: MouseEvent) => void;
  onHoverEnd: (e: MouseEvent) => void;
  onClick?: ((year: number) => void) | undefined;
}

function Year({
  count,
  maxCount,
  onClick,
  onHoverEnd,
  onHoverStart,
  year,
}: Props) {
  const onHoverStartMemoized = useMemo(
    () => onHoverStart(year),
    [onHoverStart, year]
  );

  const onClickWithYear = useCallback(
    () => onClick && onClick(year),
    [onClick, year]
  );

  return (
    <motion.div
      animate="animate"
      className={rootStyle}
      initial="initial"
      onClick={onClickWithYear}
      onHoverEnd={onHoverEnd}
      onHoverStart={onHoverStartMemoized}
      transition={{ ease: "easeOut" }}
      variants={{
        initial: { height: 0 },
        animate: {
          height: transform(count || 0, [0, maxCount], [0, 200]),
        },
      }}
      whileHover="hover"
    >
      <motion.div
        className={barStyle}
        variants={{
          animate: {
            backgroundColor: transform(
              count || 0,
              [0, maxCount],
              [lightGrey, lighterGrey]
            ),
          },
          hover: {
            backgroundColor: transform(
              count || 0,
              [0, maxCount],
              [lighterGrey, grey]
            ),
          },
        }}
      />
    </motion.div>
  );
}

export default memo(Year);
