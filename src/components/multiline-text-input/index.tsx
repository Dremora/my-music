import { type ChangeEvent, type HTMLAttributes } from "react";

import { inputStyle } from "./styles.css";

type MultilineTextInputProps = {
  readonly autoFocus?: boolean;
  readonly disabled?: boolean;
  readonly hasError?: boolean;
  readonly inputmode?: HTMLAttributes<HTMLTextAreaElement>["inputMode"];
  readonly onBlur?: () => void;
  readonly onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  readonly placeholder?: string;
  readonly value: string;
};

export function MultilineTextInput({
  autoFocus,
  disabled,
  hasError = false,
  inputmode,
  onBlur,
  onChange,
  placeholder,
  value,
}: MultilineTextInputProps) {
  return (
    <textarea
      autoFocus={autoFocus}
      className={inputStyle({ hasError })}
      disabled={disabled}
      inputMode={inputmode}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      value={value || ""}
    />
  );
}
