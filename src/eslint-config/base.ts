import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import { flatConfigs as importPluginConfigs } from "eslint-plugin-import-x";
// @ts-expect-error: no types
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import unicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

export const base = tseslint.config(
  {
    ...js.configs.recommended,
    name: "eslint/recommended",
  },
  {
    ...importPluginConfigs.recommended,
    name: "eslint-plugin-import-x/recommended",
  },
  {
    name: "my-music/base",
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      "sort-destructure-keys": sortDestructureKeys,
      unicorn,
      stylistic,
    },

    rules: {
      ...unicorn.configs.recommended.rules,
      eqeqeq: ["error", "always", { null: "ignore" }],
      // 'import/no-anonymous-default-export': 'error',
      // 'import/no-cycle': 'error',
      // 'import/no-extraneous-dependencies': 'error',
      "unicorn/no-abusive-eslint-disable": "off",
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "no-console": ["error", { allow: ["warn", "error", "info", "debug"] }],
      "no-useless-constructor": "error",
      "no-shadow": "error",
      "prefer-object-spread": "error",
      "no-implicit-coercion": "error",
      "object-shorthand": "error",
      "sort-destructure-keys/sort-destructure-keys": "error",
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
      "unicorn/no-array-reduce": "off",
      "unicorn/no-null": "off",
      "unicorn/no-useless-undefined": ["error", { checkArguments: false }],
      "unicorn/prevent-abbreviations": [
        "error",
        {
          replacements: {
            args: false,
            e: false,
            env: false,
            fn: false,
            params: false,
            props: false,
            ref: false,
            var: false,
            vars: false,
            utils: false,
          },
        },
      ],
      "unicorn/prefer-top-level-await": "off",
      "unicorn/text-encoding-identifier-case": "off", // very disputable, and probably should be utf-8 instead
    },
  },
);
