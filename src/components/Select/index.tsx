import { useCallback } from "react";

import { selectStyle } from "./styles.css";

interface Props<T extends string> {
  children: React.ReactNode;
  disabled?: boolean;
  value: T | null;
  onChange: (value: T) => void;
}

function Select<T extends string>({
  children,
  disabled,
  onChange,
  value,
}: Props<T>) {
  const onChangeHtmlEvent = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      onChange(e.target.value as T);
    },
    [onChange],
  );

  return (
    <select
      className={selectStyle}
      disabled={disabled}
      onChange={onChangeHtmlEvent}
      value={value || ""}
    >
      {children}
    </select>
  );
}

export default Select;
