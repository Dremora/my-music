import { style } from "@vanilla-extract/css";

import { grey, lightGrey, white } from "styles/colors.css";
import { size } from "styles/typography.css";

export const rootStyle = style({
  border: `2px solid ${lightGrey}`,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  margin: "10px 0",
  padding: "0 10px",
  backgroundColor: white,
});

export const imageStyle = style({
  backgroundColor: "transparent",
  margin: "0 20px 0 10px",
});

export const inputStyle = style([
  size.medium,
  {
    borderWidth: 0,
    height: "42px",
    width: "100%",
    outline: "none",
    color: grey,
    padding: 0,
    backgroundColor: "transparent",
    flexShrink: 1,
  },
]);
