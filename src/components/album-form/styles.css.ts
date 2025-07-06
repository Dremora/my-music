import { style } from "@vanilla-extract/css";

import { white } from "styles/colors.css";

export const formStyle = style({
  background: white,
  padding: "20px",
  margin: "10px 0",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0px 2px 8px 3px rgba(0, 0, 0, 0.09)",
});

export const buttonsStyle = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
});
