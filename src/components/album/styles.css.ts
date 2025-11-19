import { style } from "@vanilla-extract/css";

import { grey, platinum } from "styles/colors.css";

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

export const albumTitleStyle = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 8,
  alignItems: "center",
});

export const column3Style = style({
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  width: "100%",
  paddingLeft: "52px",

  "@media": {
    "(min-width: 600px)": {
      width: "auto",
      paddingBottom: 10,
      alignItems: "flex-end",
    },
  },
});

export const firstPlayedStyle = style({
  paddingTop: "4px",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",

  "@media": {
    "(min-width: 600px)": {
      width: "auto",
      paddingTop: 9,
    },
  },
});

export const albumTypeStyle = style({
  backgroundColor: grey,
  borderRadius: "4px",
  padding: "2px 4px",
  display: "flex",
});

export const appleLogoWrapperStyle = style({
  display: "flex",

  "@media": {
    "(min-width: 600px)": {
      alignItems: "center",
      justifyContent: "center",
      marginTop: "auto",
      marginBottom: "auto",
    },
  },
});

export const appleLogoSpacerStyle = style({
  flex: 1,
  minHeight: 0,
});

export const appleLogoStyle = style({
  color: grey,
  display: "block",
  flexShrink: 0,
});

export const addedStyle = style({
  fontVariant: "small-caps",
  fontSize: "10px",
  fontWeight: "bold",
});
