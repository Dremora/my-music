import { motion, transform } from "motion/react";
import { memo, useCallback, useMemo } from "react";

import { grey, lighterGrey, lightGrey } from "styles/colors.css";

import { barStyle, rootStyle } from "./styles.css";

type Props = {
  readonly year: number;
  readonly count: number;
  readonly maxCount: number;
  readonly onHoverStart: (year: number) => (e: MouseEvent) => void;
  readonly onHoverEnd: (e: MouseEvent) => void;
  readonly onClick?: ((year: number) => void) | undefined;
};

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
    [onHoverStart, year],
  );

  const onClickWithYear = useCallback(() => onClick?.(year), [onClick, year]);

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
              [lightGrey, lighterGrey],
            ),
          },
          hover: {
            backgroundColor: transform(
              count || 0,
              [0, maxCount],
              [lighterGrey, grey],
            ),
          },
        }}
      />
    </motion.div>
  );
}

export default memo(Year);
