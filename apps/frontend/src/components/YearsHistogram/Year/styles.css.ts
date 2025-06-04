import { style } from "@vanilla-extract/css";

export const rootStyle = style({
  cursor: "pointer",
  padding: "0 1px 0 1px",
  flexBasis: 0,
  flexGrow: 1,
  flexShrink: 1,

  "@media": {
    "(min-width: 600px)": {
      padding: "0 2px",
    },
  },
});

export const barStyle = style({
  borderRadius: "2px 2p x0 0",
  height: "100%",
});
