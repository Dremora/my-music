import { globalStyle } from "@vanilla-extract/css";

import { white, whiteSmoke } from "./colors.css";

globalStyle("body", {
  margin: 0,
  padding: 0,
  fontFamily: "sans-serif",
  backgroundColor: whiteSmoke,
  color: white,
});

globalStyle("*, *:before, *:after", {
  boxSizing: "border-box",
  flexShrink: 0,
  minWidth: 0,
});
