import { type ChangeEvent, type HTMLAttributes } from "react";

import { inputStyle } from "./styles.css";

type TextInputProps = {
  readonly autoFocus?: boolean;
  readonly disabled?: boolean;
  readonly hasError?: boolean;
  readonly inputmode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  readonly onBlur?: () => void;
  readonly onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  readonly pattern?: string;
  readonly placeholder?: string;
  readonly type?: "text" | "password";
  readonly value: string;
};

export function TextInput({
  autoFocus,
  disabled,
  hasError = false,
  inputmode,
  onBlur,
  onChange,
  pattern,
  placeholder,
  type = "text",
  value,
}: TextInputProps) {
  return (
    <input
      autoFocus={autoFocus}
      className={inputStyle({ hasError })}
      disabled={disabled}
      inputMode={inputmode}
      onBlur={onBlur}
      onChange={onChange}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      pattern={pattern}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
}
