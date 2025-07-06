import { style } from "@vanilla-extract/css";

import { white } from "styles/colors.css";

export const itemsStyle = style({
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  background: white,
  boxShadow: "0px 2px 8px 3px rgba(0, 0, 0, 0.09)",
  borderRadius: "5px",

  "@media": {
    "(min-width: 600px)": {
      flexDirection: "row",
      boxShadow: "none",
      background: "none",
    },
  },
});
