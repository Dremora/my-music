import { AnimatePresence, motion } from "motion/react";
import { type ChangeEvent, useCallback, useState } from "react";

import { Input } from "components/Input";
import { Text } from "components/Text";
import { useIsFirstRender } from "data/useIsFirstRender";
import type { FirstPlayedInput } from "generated/graphql";
import { formatInteger, parseInteger } from "utils";

import {
  containerStyle,
  dateInputContainerStyle,
  labelStyle,
  monthDayFieldStyle,
  radioGroupStyle,
  radioInputStyle,
  radioLabelStyle,
  yearInputFieldStyle,
} from "./styles.css";

type Props = {
  readonly disabled: boolean;
  readonly onChange: (value: FirstPlayedInput | null) => void;
  readonly value: FirstPlayedInput | null | undefined;
};

export function FirstPlayedField({ disabled, onChange, value }: Props) {
  const [firstPlayedMode, setFirstPlayedMode] = useState(() =>
    value === null || value === undefined
      ? "unknown"
      : "year" in value
        ? "date"
        : "timestamp",
  );

  const setMode = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newMode = e.target.value;
      setFirstPlayedMode(newMode);

      if (newMode === "date") {
        onChange(
          value?.year === undefined
            ? { year: undefined, month: undefined, day: undefined }
            : value,
        );
      } else if (newMode === "timestamp") {
        onChange(
          value?.timestamp === undefined ? { timestamp: undefined } : value,
        );
      } else {
        onChange(null);
      }
    },
    [onChange, value],
  );

  const isFirstRender = useIsFirstRender();

  const onTimestampChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const timestamp = parseInteger(e.target.value);
      onChange({ timestamp });
    },
    [onChange],
  );

  const onYearChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const year = parseInteger(e.target.value);
      onChange({ year, month: value?.month, day: value?.day });
    },
    [onChange, value?.day, value?.month],
  );

  const onMonthChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const month = parseInteger(e.target.value);
      onChange({ year: value?.year, month, day: value?.day });
    },
    [onChange, value?.day, value?.year],
  );

  const onDayChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const day = parseInteger(e.target.value);
      onChange({ year: value?.year, month: value?.month, day });
    },
    [onChange, value?.month, value?.year],
  );

  return (
    <div className={containerStyle}>
      <div className={labelStyle}>
        <Text color="darkPlatinum" weight="bold">
          First played {firstPlayedMode}
        </Text>
      </div>
      <div className={radioGroupStyle}>
        <label className={radioLabelStyle}>
          <input
            checked={firstPlayedMode === "timestamp"}
            className={radioInputStyle}
            disabled={disabled}
            name="firstPlayedMode"
            onChange={setMode}
            type="radio"
            value="timestamp"
          />
          <Text color="darkPlatinum">Timestamp</Text>
        </label>
        <label className={radioLabelStyle}>
          <input
            checked={firstPlayedMode === "date"}
            className={radioInputStyle}
            disabled={disabled}
            name="firstPlayedMode"
            onChange={setMode}
            type="radio"
            value="date"
          />
          <Text color="darkPlatinum">At a specific date</Text>
        </label>
        <label className={radioLabelStyle}>
          <input
            checked={firstPlayedMode === "unknown"}
            className={radioInputStyle}
            disabled={disabled}
            name="firstPlayedMode"
            onChange={setMode}
            type="radio"
            value="unknown"
          />
          <Text color="darkPlatinum">Unknown</Text>
        </label>
      </div>

      <motion.div
        animate={{ height: firstPlayedMode === "unknown" ? 0 : "auto" }}
        initial={{ height: firstPlayedMode === "unknown" ? 0 : "auto" }}
        transition={{ duration: 0.15 }}
      >
        <AnimatePresence mode="wait">
          {firstPlayedMode !== "unknown" && (
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: isFirstRender ? 1 : 0 }}
              key={firstPlayedMode}
              transition={{ duration: 0.15 }}
            >
              {firstPlayedMode === "timestamp" && (
                <div className={dateInputContainerStyle}>
                  <Input
                    disabled={disabled}
                    onChange={onTimestampChange}
                    value={formatInteger(value?.timestamp ?? null)}
                  />
                </div>
              )}

              {firstPlayedMode === "date" && (
                <div className={dateInputContainerStyle}>
                  <div className={yearInputFieldStyle}>
                    <Input
                      disabled={disabled}
                      onChange={onYearChange}
                      placeholder="YYYY"
                      type="number"
                      value={formatInteger(value?.year ?? null)}
                    />
                  </div>
                  <div className={monthDayFieldStyle}>
                    <Input
                      disabled={disabled}
                      onChange={onMonthChange}
                      placeholder="MM"
                      type="number"
                      value={formatInteger(value?.month ?? null)}
                    />
                  </div>
                  <div className={monthDayFieldStyle}>
                    <Input
                      disabled={disabled}
                      onChange={onDayChange}
                      placeholder="DD"
                      type="number"
                      value={formatInteger(value?.day ?? null)}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
