import eslintPluginStylistic from "@stylistic/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPerfectionist from "eslint-plugin-perfectionist";
import tseslint from "typescript-eslint";

export const formatting = tseslint.config(
  {
    ...eslintConfigPrettier,
    name: "my-music/formatting",
  },
  {
    ...eslintPluginPerfectionist.configs["recommended-natural"],
    name: "eslint-plugin-perfectionist/recommended-natural",
    rules: {
      ...eslintPluginPerfectionist.configs["recommended-natural"].rules,
      "perfectionist/sort-imports": "off",
      "perfectionist/sort-objects": "off",
      "perfectionist/sort-union-types": "off",
      "perfectionist/sort-modules": "off",
    },
  },
  {
    name: "my-music/stylistic",
    plugins: {
      "@stylistic": eslintPluginStylistic,
    },
    rules: {
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", next: "multiline-block-like", prev: "*" },
        { blankLine: "always", next: "multiline-const", prev: "*" },
        { blankLine: "always", next: "multiline-expression", prev: "*" },
        { blankLine: "always", next: "multiline-let", prev: "*" },
        { blankLine: "always", next: "return", prev: "*" },
        { blankLine: "always", next: "*", prev: "multiline-block-like" },
        { blankLine: "always", next: "*", prev: "multiline-const" },
        { blankLine: "always", next: "*", prev: "multiline-expression" },
        { blankLine: "always", next: "*", prev: "multiline-let" },
        { blankLine: "always", next: "*", prev: "import" },
        { blankLine: "any", next: "import", prev: "import" },
      ],
    },
  },
);
