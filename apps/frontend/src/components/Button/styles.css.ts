import { recipe } from "@vanilla-extract/recipes";

import {
  blue,
  darkerPlatinum,
  darkerVermilion,
  grey,
  vermilion,
  white,
} from "styles/colors.css";
import { size } from "styles/typography.css";

export const buttonStyle = recipe({
  base: {
    border: "none",
    display: "block",
    appearance: "none",
    backgroundColor: "transparent",
  },
  variants: {
    full: {
      true: {
        width: "100%",
      },
    },
    size: {
      small: [
        size.base,
        {
          padding: "3px 10px",
          fontWeight: 700,
        },
      ],
      medium: [
        size.medium,
        {
          padding: "7px 20px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "1px",
        },
      ],
    },
    palette: {
      primary: {
        color: white,
        backgroundColor: darkerVermilion,
        boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.09)",
        transition: "0.1s",

        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: vermilion,
          },
        },
      },

      secondary: {
        color: white,
        backgroundColor: grey,
        boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.09)",
      },

      link: [
        size.base,
        {
          color: blue,
          padding: 0,
          fontWeight: 700,

          ":hover": {
            textDecoration: "underline",
          },
        },
      ],
    },
    disabled: {
      true: {
        backgroundColor: darkerPlatinum,
      },
      false: {
        cursor: "pointer",
      },
    },
  },
});
