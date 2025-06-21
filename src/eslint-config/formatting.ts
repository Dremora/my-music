import eslintPluginStylistic from "@stylistic/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export const formatting = tseslint.config(
  {
    ...eslintConfigPrettier,
    name: "my-music/formatting",
  },
  {
    name: "my-music/stylistic",
    plugins: {
      "@stylistic": eslintPluginStylistic,
    },
    rules: {
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "multiline-block-like" },
        { blankLine: "always", prev: "*", next: "multiline-const" },
        { blankLine: "always", prev: "*", next: "multiline-expression" },
        { blankLine: "always", prev: "*", next: "multiline-let" },
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: "multiline-block-like", next: "*" },
        { blankLine: "always", prev: "multiline-const", next: "*" },
        { blankLine: "always", prev: "multiline-expression", next: "*" },
        { blankLine: "always", prev: "multiline-let", next: "*" },
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "any", prev: "import", next: "import" },
      ],
    },
  },
);
