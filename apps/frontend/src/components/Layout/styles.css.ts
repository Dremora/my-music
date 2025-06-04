import { style } from "@vanilla-extract/css";

import { vermilion } from "styles/colors.css";
import { size } from "styles/typography.css";

export const pageStyle = style({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "stretch",
});

export const headerStyle = style({
  padding: "20px 0 20px 4px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const homeLinkStyle = style({
  textDecoration: "none",
  display: "flex",
});

export const h1Style = style([
  size.h1,
  {
    margin: 0,
    fontWeight: 700,
    marginLeft: "10px",
    color: vermilion,
  },
]);

export const sectionStyle = style({
  display: "flex",
  flexDirection: "column",
  maxWidth: "800px",
  padding: "0 10px",
  margin: "0 auto",
  width: "100%",
});
