import { FloatingPortal, useFloating } from "@floating-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";

import { Text } from "components/Text";
import type { yearsHistogramFragment$key } from "generated/yearsHistogramFragment.graphql";

import { rootStyle } from "./styles.css";
import { Year } from "./Year";

function getMaxValue(numbers: number[]): number {
  return numbers.length === 0
    ? 0
    : numbers.reduce(
        (accumulator, value) => Math.max(accumulator, value),
        -Infinity,
      );
}

function getMinValue(numbers: number[]): number {
  return numbers.length === 0
    ? 0
    : numbers.reduce(
        (accumulator, value) => Math.min(accumulator, value),
        Infinity,
      );
}

function range(start: number, stop: number): number[] {
  return Array.from({ length: stop - start + 1 }, (_, index) => start + index);
}

const yearsHistogramFragment = graphql`
  fragment yearsHistogramFragment on AlbumPerYearCount @relay(plural: true) {
    year
    count
  }
`;

type YearsHistogramProps = {
  readonly fragmentRef: yearsHistogramFragment$key;
  readonly onYearClick?: (year: number) => void;
};

export function YearsHistogram({
  fragmentRef,
  onYearClick,
}: YearsHistogramProps) {
  const data = useFragment(yearsHistogramFragment, fragmentRef);
  const [selectedYear, setSelectedYear] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);

  const { isPositioned, refs, strategy, x, y } = useFloating({
    placement: "bottom",
  });

  const dataWithYear = useMemo(
    () => data.filter(({ year }) => year !== 0),
    [data],
  );

  const counts = useMemo<number[]>(
    () => dataWithYear.map(({ count }) => count),
    [dataWithYear],
  );

  const maxCount = useMemo(() => getMaxValue(counts), [counts]);

  const yearMap = useMemo(() => {
    const map: Record<number, number> = {};
    for (const { count, year } of dataWithYear) map[year] = count;

    return map;
  }, [dataWithYear]);

  const years = dataWithYear.map(({ year }) => year);

  const yearsWithoutGaps = useMemo(
    () => range(getMinValue(years), getMaxValue(years)),
    [years],
  );

  const showYear = useCallback(
    (year: number) => (e: MouseEvent) => {
      setSelectedYear(year);

      if (e.target instanceof HTMLElement) {
        refs.setReference(e.target);

        requestAnimationFrame(() => {
          setIsOpen(true);
        });
      }
    },
    [refs],
  );

  const hideYear = useCallback(() => {
    refs.setReference(null);

    requestAnimationFrame(() => {
      setIsOpen(false);
    });
  }, [refs]);

  return (
    <>
      <div className={rootStyle}>
        {yearsWithoutGaps.map((year) => (
          <Year
            count={yearMap[year] ?? 0}
            key={year}
            maxCount={maxCount}
            onClick={onYearClick}
            onHoverEnd={hideYear}
            onHoverStart={showYear}
            year={year}
          />
        ))}
      </div>

      <FloatingPortal>
        <AnimatePresence>
          {isOpen && isPositioned ? (
            <motion.div
              animate={{ opacity: 1, left: x }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0, left: x }}
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y,
              }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            >
              <Text color="grey" weight="bold">
                {selectedYear}
              </Text>
            </motion.div>
          ) : (
            <div
              ref={refs.setFloating}
              style={{
                visibility: "hidden",
                position: strategy,
                left: x,
                top: y,
              }}
            >
              <Text color="grey" weight="bold">
                {selectedYear}
              </Text>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}
