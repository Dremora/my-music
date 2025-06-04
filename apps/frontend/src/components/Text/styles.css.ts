import { recipe } from "@vanilla-extract/recipes";

import { colorVariant } from "styles/colors.css";
import { size } from "styles/typography.css";

export const textStyle = recipe({
  base: {},
  variants: {
    color: colorVariant,
    size: {
      small: size.small,
      base: size.base,
      medium: size.medium,
      large: size.large,
    },
    weight: {
      normal: {
        fontWeight: 400,
      },
      bold: {
        fontWeight: 700,
      },
    },
  },
});
