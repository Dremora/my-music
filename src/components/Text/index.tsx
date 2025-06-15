import type { ReactNode } from "react";

import * as colors from "styles/colors.css";

import { textStyle } from "./styles.css";

type Color = keyof typeof colors;

type Props = {
  readonly children: ReactNode;
  readonly color: Color;
  readonly size?: "small" | "base" | "medium" | "large";
  readonly weight?: "normal" | "bold";
};

function Text({ children, color, size = "base", weight = "normal" }: Props) {
  return <span className={textStyle({ color, size, weight })}>{children}</span>;
}

export default Text;
