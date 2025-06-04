import { style } from "@vanilla-extract/css";

import { lighterGrey } from "styles/colors.css";

export const containerStyle = style({
  display: "flex",
  flexDirection: "column",
  width: "48px",
  height: "48px",
  alignItems: "center",
  justifyContent: "center",
});

export const barStyle = style({
  width: "30px",
  height: "4px",
  borderRadius: "2px",
  backgroundColor: lighterGrey,
  margin: "2px 0",
});
