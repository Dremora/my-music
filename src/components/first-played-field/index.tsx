import { AnimatePresence, motion } from "motion/react";
import { type ChangeEvent, useCallback, useState } from "react";

import { Text } from "components/text";
import { TextInput } from "components/text-input";
import { useIsFirstRender } from "data/use-is-first-render";
import { type FirstPlayed, formatInteger, parseInteger } from "utils";

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

type FirstPlayedFieldProps = {
  readonly disabled: boolean;
  readonly onChange: (value: FirstPlayed | null) => void;
  readonly value: FirstPlayed | null;
};

export function FirstPlayedField({
  disabled,
  onChange,
  value,
}: FirstPlayedFieldProps) {
  const [firstPlayedMode, setFirstPlayedMode] = useState(() =>
    value == null ? "unknown" : "year" in value ? "date" : "timestamp",
  );

  const setMode = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newMode = e.target.value;
      setFirstPlayedMode(newMode);

      if (newMode === "date") {
        onChange(
          value && (!("year" in value) || value.year === undefined)
            ? { year: undefined, month: undefined, day: undefined }
            : value,
        );
      } else if (newMode === "timestamp") {
        onChange(
          value && (!("timestamp" in value) || value.timestamp === undefined)
            ? { timestamp: undefined }
            : value,
        );
      } else {
        onChange(null);
      }
    },
    [onChange, value],
  );

  const isFirstRender = useIsFirstRender();

  const onTimestampChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const timestamp = parseInteger(e.target.value);

      if (timestamp != null) {
        onChange({ timestamp });
      }
    },
    [onChange],
  );

  const onYearChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const year = parseInteger(e.target.value);
      const month = value && "month" in value ? value.month : undefined;
      const day = value && "day" in value ? value.day : undefined;

      onChange({ year, month, day });
    },
    [onChange, value],
  );

  const onMonthChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const month = parseInteger(e.target.value);
      const year = value && "year" in value ? value.year : undefined;
      const day = value && "day" in value ? value.day : undefined;

      onChange({ year, month, day });
    },
    [onChange, value],
  );

  const onDayChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const day = parseInteger(e.target.value);
      const year = value && "year" in value ? value.year : undefined;
      const month = value && "month" in value ? value.month : undefined;

      onChange({ year, month, day });
    },
    [onChange, value],
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
                  <TextInput
                    disabled={disabled}
                    onChange={onTimestampChange}
                    value={formatInteger(
                      value && "timestamp" in value
                        ? (value.timestamp ?? null)
                        : null,
                    )}
                  />
                </div>
              )}

              {firstPlayedMode === "date" && (
                <div className={dateInputContainerStyle}>
                  <div className={yearInputFieldStyle}>
                    <TextInput
                      disabled={disabled}
                      inputmode="numeric"
                      onChange={onYearChange}
                      pattern="[0-9]*"
                      placeholder="YYYY"
                      value={formatInteger(
                        value && "year" in value ? (value.year ?? null) : null,
                      )}
                    />
                  </div>
                  <div className={monthDayFieldStyle}>
                    <TextInput
                      disabled={disabled}
                      inputmode="numeric"
                      onChange={onMonthChange}
                      pattern="[0-9]*"
                      placeholder="MM"
                      value={formatInteger(
                        value && "month" in value
                          ? (value.month ?? null)
                          : null,
                      )}
                    />
                  </div>
                  <div className={monthDayFieldStyle}>
                    <TextInput
                      disabled={disabled}
                      inputmode="numeric"
                      onChange={onDayChange}
                      pattern="[0-9]*"
                      placeholder="DD"
                      value={formatInteger(
                        value && "day" in value ? (value.day ?? null) : null,
                      )}
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
