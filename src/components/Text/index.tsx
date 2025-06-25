import type { ReactNode } from "react";

import * as colors from "styles/colors.css";

import { textStyle } from "./styles.css";

type Color = keyof typeof colors;

type TextProps = {
  readonly children: ReactNode;
  readonly color: Color;
  readonly size?: "small" | "base" | "medium" | "large";
  readonly weight?: "normal" | "bold";
};

export function Text({
  children,
  color,
  size = "base",
  weight = "normal",
}: TextProps) {
  return <span className={textStyle({ color, size, weight })}>{children}</span>;
}
