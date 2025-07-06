import { style } from "@vanilla-extract/css";

import {
  darkerPlatinum,
  darkPlatinum,
  platinum,
  white,
} from "styles/colors.css";
import { size } from "styles/typography.css";

export const inputStyle = style([
  size.base,
  {
    border: `2px solid ${platinum}`,
    lineHeight: 2,
    padding: "2px 10px",
    display: "block",
    width: "100%",
    flexGrow: 1,
    flexShrink: 1,
    color: darkPlatinum,
    transition: "all 0.2s",
    background: white,

    ":focus": {
      outline: "none",
      borderColor: darkerPlatinum,
      boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.09)",
    },

    ":disabled": {
      backgroundColor: platinum,
    },
  },
]);
