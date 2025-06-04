import { styleVariants } from "@vanilla-extract/css";
import { darken } from "polished";

export const vermilion = `#e25d36`;
export const darkerVermilion = darken(0.2, vermilion);
export const darkVermilion = darken(0.4, vermilion);

export const platinum = `#e6e6ea`;
export const darkerPlatinum = darken(0.2, platinum);
export const darkPlatinum = darken(0.4, platinum);

export const blue = "#3f8aff";

export const whiteSmoke = `#f4f4f8`;

export const grey = "#5f5f5f";
export const lighterGrey = "#a3a3a3";
export const lightGrey = "#dcd4d4";
export const white = "#ffffff";

export const allColors = {
  vermilion,
  darkerVermilion,
  darkVermilion,
  platinum,
  darkerPlatinum,
  darkPlatinum,
  blue,
  whiteSmoke,
  grey,
  lighterGrey,
  lightGrey,
  white,
} as const;

export type Color = keyof typeof allColors;

// eslint-disable-next-line no-type-assertion/no-type-assertion
const allColorsArray = Object.keys(allColors) as Color[];

export const colorVariant = styleVariants(
  Object.fromEntries(
    allColorsArray.map((colorName) => [
      colorName,
      { color: allColors[colorName] },
    ])
  )
);
