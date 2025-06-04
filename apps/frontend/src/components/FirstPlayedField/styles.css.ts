import { style } from "@vanilla-extract/css";

export const containerStyle = style({
  display: "flex",
  flexDirection: "column",
  margin: "10px  0",
});

export const labelStyle = style({
  paddingBottom: "10px",
});

export const radioGroupStyle = style({
  display: "flex",
});

export const radioLabelStyle = style({
  marginRight: "15px",
  display: "flex",
  alignItems: "baseline",
});

export const radioInputStyle = style({
  marginRight: "5px",
});

export const dateInputContainerStyle = style({
  margin: "10px 0",
  display: "flex",
});

export const yearInputFieldStyle = style({
  width: "65px",
  fontVariantNumeric: "tabular-nums",
});

export const monthDayFieldStyle = style({
  width: "55px",
  fontVariantNumeric: "tabular-nums",
  marginLeft: "10px",
});
