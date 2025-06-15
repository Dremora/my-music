import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export const formatting = tseslint.config({
  ...eslintConfigPrettier,
  name: "my-music/formatting",
});
