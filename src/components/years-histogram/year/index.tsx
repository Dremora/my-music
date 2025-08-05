import { motion, transform } from "motion/react";
import { memo } from "react";

import { grey, lighterGrey, lightGrey } from "styles/colors.css";

import { barStyle, rootStyle } from "./styles.css";

type YearProps = {
  readonly count: number;
  readonly maxCount: number;
  readonly onClick?: ((year: number) => void) | undefined;
  readonly onHoverEnd: (e: MouseEvent) => void;
  readonly onHoverStart: (year: number) => (e: MouseEvent) => void;
  readonly year: number;
};

export const Year = memo(function Year({
  count,
  maxCount,
  onClick,
  onHoverEnd,
  onHoverStart,
  year,
}: YearProps) {
  const onHoverStartMemoized = onHoverStart(year);
  const onClickWithYear = () => onClick?.(year);

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
});
