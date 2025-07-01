import { style, styleVariants } from "@vanilla-extract/css";

const base = style({
  fontFamily: "Lato",
  fontStyle: "normal",
  WebkitFontSmoothing: "antialiased",
});

export const size = styleVariants({
  xSmall: [
    base,
    {
      fontSize: "10px",
      lineHeight: "12px",
      fontWeight: 400,
    },
  ],
  small: [
    base,
    {
      fontSize: "12px",
      lineHeight: "18px",
      fontWeight: 400,
    },
  ],
  base: [
    base,
    {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 400,
    },
  ],
  medium: [
    base,
    {
      fontSize: "18px",
      lineHeight: "26px",
      fontWeight: 400,
    },
  ],
  large: [
    base,
    {
      fontSize: "21px",
      lineHeight: 1.5,
      fontWeight: 400,
    },
  ],
  h1: [
    base,
    {
      fontSize: "32px",
      lineHeight: "48px",
    },
  ],
});
