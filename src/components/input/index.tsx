import type { ChangeEvent, HTMLAttributes } from "react";

import { inputStyle } from "./styles.css";

type InputProps = {
  readonly autoFocus?: boolean;
  readonly disabled?: boolean;
  readonly inputmode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  readonly multiline?: boolean;
  readonly onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readonly pattern?: string;
  readonly placeholder?: string;
  readonly type?: "text" | "password";
  readonly value: string;
};

export function Input({
  autoFocus,
  disabled,
  inputmode,
  multiline = false,
  onChange,
  pattern,
  placeholder,
  type = "text",
  value,
}: InputProps) {
  return multiline ? (
    <textarea
      autoFocus={autoFocus}
      className={inputStyle}
      disabled={disabled}
      inputMode={inputmode}
      onChange={onChange}
      placeholder={placeholder}
      value={value || ""}
    />
  ) : (
    <input
      autoFocus={autoFocus}
      className={inputStyle}
      disabled={disabled}
      inputMode={inputmode}
      onChange={onChange}
      pattern={pattern}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
}
