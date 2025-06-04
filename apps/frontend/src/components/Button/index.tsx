import { buttonStyle } from "./styles.css";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  type?: "button" | "submit";
  palette?: "primary" | "secondary" | "link";
  size?: "medium" | "small";
  full?: boolean;
}

function Button({
  children,
  disabled = false,
  full = false,
  onClick,
  palette = "primary",
  size = "medium",
  type = "button",
}: Props) {
  return (
    <button
      className={buttonStyle({ full, disabled, size, palette })}
      disabled={disabled}
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"}
    >
      {children}
    </button>
  );
}

export default Button;
