import { style } from "@vanilla-extract/css";

export const menuButtonStyle = style({
  border: "none",
  display: "block",
  appearance: "none",
  background: "none",
  cursor: "pointer",
  position: "relative",
});

export const smallScreenStyle = style({
  display: "flex",

  "@media": {
    "(min-width: 600px)": {
      display: "none",
    },
  },
});

export const largeScreenStyle = style({
  display: "none",

  "@media": {
    "(min-width: 600px)": {
      display: "flex",
    },
  },
});
