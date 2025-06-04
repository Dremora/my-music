import * as colors from "styles/colors.css";

import { textStyle } from "./styles.css";

type Color = keyof typeof colors;

interface Props {
  children: React.ReactNode;
  color: Color;
  size?: "small" | "base" | "medium" | "large";
  weight?: "normal" | "bold";
}

function Text({ children, color, size = "base", weight = "normal" }: Props) {
  return (
    <span className={textStyle({ color, size: size, weight })}>{children}</span>
  );
}

export default Text;
