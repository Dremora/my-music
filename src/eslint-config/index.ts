import tseslint from "typescript-eslint";

import { backend } from "./backend";
import { base } from "./base";
import { formatting } from "./formatting";
import { frontend } from "./frontend";
import { ignores } from "./ignores";
import { scripts } from "./scripts";
import { typescript } from "./typescript";

export const config = tseslint.config(
  ...ignores,
  ...base,
  ...frontend,
  ...backend,
  ...typescript,
  ...scripts,
  ...formatting,
);
