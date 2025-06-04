import { globalStyle, style } from "@vanilla-extract/css";

import { grey, lighterGrey } from "styles/colors.css";

export const listItemStyle = style({
  display: "block",
  position: "relative",
  margin: "10px",

  "@media": {
    "(min-width: 600px)": {
      margin: 0,
      marginLeft: "20px",
    },
  },
});

export const anchorStyle = style({
  textDecoration: "none",
  display: "block",
});

globalStyle(`${anchorStyle}:hover span`, {
  color: lighterGrey,
});

export const barStyle = style({
  position: "absolute",
  height: "2px",
  backgroundColor: grey,
  bottom: 0,
});
