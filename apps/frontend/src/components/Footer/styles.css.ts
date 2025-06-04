import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const rootStyle = style({
  padding: "10px 0",
  display: "flex",
  alignItems: "center",
  height: "60px",
});

export const spacerStyle = style({
  width: "10px",
});

export const loginLinkStyle = recipe({
  base: {
    appearance: "none" /* to reset platform-specific button styles */,
    background: "none",
    outline: "none" /* to remove focus ring */,
    cursor: "pointer",
    border: "none",
    padding: "0",
    margin: "0" /* Safari */,
    marginLeft: "62px",
  },
  variants: {
    disabled: {
      true: {
        pointerEvents: "none",
        cursor: "auto",
      },
    },
  },
});
