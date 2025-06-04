import { style } from "@vanilla-extract/css";

import {
  darkPlatinum,
  darkerPlatinum,
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

    // TODO don't use type=number https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/
    selectors: {
      '&[type="number"]::-webkit-inner-spin-button': {
        WebkitAppearance: "none",
        margin: 0,
      },
    },

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
