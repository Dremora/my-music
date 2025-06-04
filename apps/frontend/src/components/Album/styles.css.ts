import { style } from "@vanilla-extract/css";

import { platinum } from "styles/colors.css";

export const anchorStyle = style({
  textDecoration: "none",
  display: "flex",
  flexDirection: "row",
  padding: "5px 10px",
  cursor: "pointer",
  flexWrap: "wrap",

  ":hover": {
    backgroundColor: platinum,
  },

  "@media": {
    "(min-width: 600px)": {
      flexWrap: "nowrap",
    },
  },
});

export const rootStyle = style({
  textDecoration: "none",
  display: "flex",
  flexDirection: "row",
  padding: "5px 10px",
  cursor: "pointer",
  flexWrap: "wrap",

  ":hover": {
    backgroundColor: platinum,
  },

  "@media": {
    "(min-width: 600px)": {
      flexWrap: "nowrap",
    },
  },
});

export const column1Style = style({
  width: "52px",
  paddingTop: "9px",
  paddingRight: "10px",
  flexShrink: 0,
});

export const column2Style = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  flexShrink: 1,
  width: "calc(100% - 52px)",

  "@media": {
    "(min-width: 600px)": {
      width: "auto",
    },
  },
});

export const column3Style = style({
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  width: "100%",
  paddingLeft: "52px",
  paddingTop: "4px",

  "@media": {
    "(min-width: 600px)": {
      width: "auto",
      padding: "9px 0 0 10px",
    },
  },
});

export const firstPlayedStyle = style({
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
});
