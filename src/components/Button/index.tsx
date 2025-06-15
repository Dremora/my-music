import type { MouseEvent, ReactNode } from "react";

import { buttonStyle } from "./styles.css";

type Props = {
  readonly children: ReactNode;
  readonly disabled?: boolean;
  readonly onClick?: (
    event: MouseEvent<HTMLButtonElement>,
  ) => void | Promise<void>;
  readonly type?: "button" | "submit";
  readonly palette?: "primary" | "secondary" | "link";
  readonly size?: "medium" | "small";
  readonly full?: boolean;
};

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
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"}
    >
      {children}
    </button>
  );
}

export default Button;
