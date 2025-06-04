import {
  FloatingPortal,
  useFloating,
} from "@floating-ui/react-dom-interactions";
import { AnimatePresence, m } from "framer-motion";
import { useCallback, useMemo, useState } from "react";

import Text from "components/Text";
import { AlbumPerYearCount } from "generated/graphql";

import { rootStyle } from "./styles.css";
import Year from "./Year";

const getMaxValue = (numbers: number[]): number =>
  numbers.length === 0
    ? 0
    : numbers.reduce((acc, value) => Math.max(acc, value), -Infinity);

const getMinValue = (numbers: number[]): number =>
  numbers.length === 0
    ? 0
    : numbers.reduce((acc, value) => Math.min(acc, value), Infinity);

const range = (start: number, stop: number): number[] =>
  Array.from({ length: stop - start + 1 }, (_, i) => start + i);

interface Props {
  data: ReadonlyArray<AlbumPerYearCount>;
  onYearClick?: (year: number) => void;
}

function YearsHistogram({ data, onYearClick }: Props) {
  const [selectedYear, setSelectedYear] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);

  const { floating, reference, strategy, x, y } = useFloating({
    placement: "bottom",
    // middleware: [offset(1)], // not doing so causes helicopter effect
  });

  const dataWithYear = useMemo(
    () => data.filter(({ year }) => year !== 0),
    [data]
  );

  const counts = useMemo<number[]>(
    () => dataWithYear.map(({ count }) => count),
    [dataWithYear]
  );

  const maxCount = useMemo(() => getMaxValue(counts), [counts]);

  const yearMap = useMemo(() => {
    const map: { [key: number]: number } = {};
    dataWithYear.forEach(({ count, year }) => (map[year] = count));
    return map;
  }, [dataWithYear]);

  const years = dataWithYear.map(({ year }) => year);

  const yearsWithoutGaps = useMemo(
    () => range(getMinValue(years), getMaxValue(years)),
    [years]
  );

  const showYear = useCallback(
    (year: number) => (e: MouseEvent) => {
      setSelectedYear(year);

      if (e.currentTarget instanceof HTMLElement) {
        reference(e.currentTarget);
        setIsOpen(true);
      }
    },
    [reference]
  );

  const hideYear = useCallback(() => {
    reference(null);
    setIsOpen(false);
  }, [reference]);

  console.log({ x, isOpen });

  return (
    <>
      <div className={rootStyle}>
        {yearsWithoutGaps.map((year) => (
          <Year
            count={yearMap[year] || 0}
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
          {isOpen ? (
            <m.div
              animate={{ opacity: 1, left: x ?? 0 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0, left: x ?? 0 }}
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
              }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            >
              <Text color="grey" weight="bold">
                {selectedYear}
              </Text>
            </m.div>
          ) : (
            <div
              ref={floating}
              style={{
                visibility: "hidden",
                position: strategy,
                left: x ?? 0,
                top: y ?? 0,
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

export default YearsHistogram;
