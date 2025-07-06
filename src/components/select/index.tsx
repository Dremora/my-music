import { type ChangeEvent, type ReactNode, useCallback } from "react";

import { selectStyle } from "./styles.css";

type SelectProps<T extends string> = {
  readonly allowEmpty?: boolean;
  readonly children: ReactNode;
  readonly disabled?: boolean;
  readonly hasError?: boolean;
  readonly onChange: (value: T) => void;
  readonly value: T | null;
};

export function Select<T extends string>({
  allowEmpty = false,
  children,
  disabled,
  hasError = false,
  onChange,
  value,
}: SelectProps<T>) {
  const onChangeHtmlEvent = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, no-type-assertion/no-type-assertion
      onChange(e.target.value as T);
    },
    [onChange],
  );

  return (
    <select
      className={selectStyle({ hasError })}
      disabled={disabled}
      onChange={onChangeHtmlEvent}
      value={value ?? ""}
    >
      {allowEmpty && (
        <option disabled hidden value="">
          {" "}
        </option>
      )}
      {children}
    </select>
  );
}
