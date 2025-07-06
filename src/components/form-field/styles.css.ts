import { style } from "@vanilla-extract/css";

export const containerStyle = style({
  display: "flex",
  flexDirection: "column",
  margin: "10px 0",
});

export const labelStyle = style({
  paddingBottom: "10px",
});

export const contentsStyle = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  flexShrink: 1,
});
