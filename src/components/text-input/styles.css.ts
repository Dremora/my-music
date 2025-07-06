import { recipe } from "@vanilla-extract/recipes";

import {
  darkerPlatinum,
  darkPlatinum,
  platinum,
  vermilion,
  white,
} from "styles/colors.css";
import { size } from "styles/typography.css";

export const inputStyle = recipe({
  base: [
    size.base,
    {
      borderWidth: 2,
      borderStyle: "solid",
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
        boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.09)",
      },

      ":disabled": {
        backgroundColor: platinum,
      },
    },
  ],
  variants: {
    hasError: {
      true: {
        borderColor: vermilion,
      },
      false: {
        borderColor: platinum,
        ":focus": {
          borderColor: darkerPlatinum,
        },
      },
    },
  },
});
