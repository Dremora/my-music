import { type ChangeEvent, type ReactNode, useCallback } from "react";

import { selectStyle } from "./styles.css";

type Props<T extends string> = {
  readonly children: ReactNode;
  readonly disabled?: boolean;
  readonly value: T | null;
  readonly onChange: (value: T) => void;
};

export function Select<T extends string>({
  children,
  disabled,
  onChange,
  value,
}: Props<T>) {
  const onChangeHtmlEvent = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, no-type-assertion/no-type-assertion
      onChange(e.target.value as T);
    },
    [onChange],
  );

  return (
    <select
      className={selectStyle}
      disabled={disabled}
      onChange={onChangeHtmlEvent}
      value={value ?? ""}
    >
      {children}
    </select>
  );
}
