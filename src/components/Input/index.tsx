import type { ChangeEvent } from "react";

import { inputStyle } from "./styles.css";

type Props = {
  readonly autoFocus?: boolean;
  readonly disabled?: boolean;
  readonly multiline?: boolean;
  readonly onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readonly placeholder?: string;
  readonly type?: string;
  readonly value: string;
};

function Input({
  autoFocus,
  disabled,
  multiline = false,
  onChange,
  placeholder,
  type = "text",
  value,
}: Props) {
  return multiline ? (
    <textarea
      autoFocus={autoFocus}
      className={inputStyle}
      disabled={disabled}
      onChange={onChange}
      placeholder={placeholder}
      value={value || ""}
    />
  ) : (
    <input
      autoFocus={autoFocus}
      className={inputStyle}
      disabled={disabled}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value || ""}
    />
  );
}

export default Input;
