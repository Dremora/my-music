import { inputStyle } from "./styles.css";

interface Props {
  autoFocus?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder?: string;
  type?: string;
  value: string;
}

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
