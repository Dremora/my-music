import tseslint from "typescript-eslint";

import { ignoredFiles } from "./config";

export const ignores = tseslint.config({
  name: "my-music/ignores",
  ignores: ignoredFiles,
});
