import tseslint from "typescript-eslint";

import { backend } from "./backend";
import { base } from "./base";
import { formatting } from "./formatting";
import { frontend } from "./frontend";

export const config = tseslint.config(
  ...base,
  ...frontend,
  ...backend,
  ...formatting,
);
