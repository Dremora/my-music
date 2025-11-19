import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import {
  darkerPlatinum,
  darkPlatinum,
  lightGrey,
  platinum,
  white,
} from "styles/colors.css";
import { size } from "styles/typography.css";

export const containerStyle = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  margin: "10px 0",
  gap: "10px",
});

export const buttonGroupStyle = style({
  display: "flex",
  gap: 0,
  border: `1px solid ${lightGrey}`,
  borderRadius: "4px",
  backgroundColor: white,
  overflow: "hidden",
});

export const buttonStyle = recipe({
  base: [
    size.small,
    {
      border: "none",
      borderRight: `1px solid ${lightGrey}`,
      padding: "6px 14px",
      backgroundColor: white,
      color: darkPlatinum,
      cursor: "pointer",
      transition: "all 0.2s",
      fontWeight: 700,

      ":first-child": {
        borderTopLeftRadius: "3px",
        borderBottomLeftRadius: "3px",
      },

      ":last-child": {
        borderRight: "none",
        borderTopRightRadius: "3px",
        borderBottomRightRadius: "3px",
      },

      ":hover": {
        backgroundColor: platinum,
      },
    },
  ],
  variants: {
    active: {
      true: {
        backgroundColor: darkPlatinum,
        color: white,

        ":hover": {
          backgroundColor: darkerPlatinum,
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
  },
});
