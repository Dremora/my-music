import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import functional from "eslint-plugin-functional";
import { flatConfigs as importPluginConfigs } from "eslint-plugin-import-x";
// @ts-expect-error: no types
import noTypeAssertion from "eslint-plugin-no-type-assertion";
import eslintPluginPerfectionist from "eslint-plugin-perfectionist";
// @ts-expect-error: no types
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import unicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

import { defaultExportFiles, ignoredFiles } from "./config";
import { custom } from "./custom-rules";

export const base = tseslint.config(
  { ignores: ignoredFiles, name: "my-music/ignores" },
  { ...eslint.configs.recommended, name: "eslint/recommended" },
  // eslint-disable-next-line import-x/no-named-as-default-member
  tseslint.configs.strictTypeChecked,
  // eslint-disable-next-line import-x/no-named-as-default-member
  tseslint.configs.stylisticTypeChecked,
  {
    ...importPluginConfigs.recommended,
    name: "eslint-plugin-import-x/recommended",
  },
  importPluginConfigs.typescript,
  unicorn.configs.recommended,
  { ...functional.configs.lite, name: "eslint-plugin-functional/lite" },
  {
    ...eslintPluginPerfectionist.configs["recommended-natural"],
    name: "eslint-plugin-perfectionist/recommended-natural",
  },
  {
    name: "my-music/base",
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      "@stylistic": stylistic,
      custom,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      "no-type-assertion": noTypeAssertion,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      "sort-destructure-keys": sortDestructureKeys,
    },
    rules: {
      // @eslint/js
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-console": ["error", { allow: ["warn", "error", "info", "debug"] }],
      "no-implicit-coercion": "error",
      "no-type-assertion/no-type-assertion": "error",
      "object-shorthand": "error",
      "prefer-object-spread": "error",
      "sort-destructure-keys/sort-destructure-keys": "error",
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],

      // @stylistic/eslint-plugin
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

      // @typescript-eslint
      // Already enabled in the shared config, but with adjusted options
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          // Already enabled in the shared config, but with adjusted options (to allow numbers)
          allowAny: false,
          allowBoolean: false,
          allowNullish: false,
          allowRegExp: false,
        },
      ],

      // The following rules are not available in the recommended preset, but are still useful
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["camelCase"],
          leadingUnderscore: "allow",
          selector: "default",
          trailingUnderscore: "allow",
        },
        {
          format: ["camelCase", "PascalCase"],
          selector: "import",
        },
        {
          // PascalCase for React components
          // UPPER_CASE for constants
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow",
          modifiers: ["const"],
          selector: "variable",
          trailingUnderscore: "allow",
        },
        {
          format: ["camelCase", "UPPER_CASE", "snake_case", "PascalCase"],
          modifiers: ["destructured"],
          selector: "variable",
        },
        {
          // PascalCase for React components
          format: ["camelCase", "PascalCase"],
          selector: "function",
        },
        {
          format: ["PascalCase"],
          selector: "typeLike",
        },
        {
          format: null,
          modifiers: ["requiresQuotes"],
          selector: "objectLiteralProperty",
        },
        {
          // Prisma properties can be a mix of camel and snake case
          filter: {
            match: true,
            regex: "^[a-z][A-Za-z0-9]*_[a-z][A-Za-z0-9]*$",
          },
          format: null,
          selector: "objectLiteralProperty",
        },
        {
          // Required for REST responses, 3rd party APIs and AWS
          format: ["camelCase", "UPPER_CASE", "snake_case", "PascalCase"],
          leadingUnderscore: "allow",
          selector: [
            "objectLiteralProperty",
            "objectLiteralMethod",
            "parameter",
          ],
        },
        {
          filter: {
            match: true,
            regex: "^__esModule$",
          },
          format: null,
          selector: ["objectLiteralProperty"],
        },
        {
          filter: {
            match: true,
            regex: "^__html$",
          },
          format: null,
          selector: ["objectLiteralProperty"],
        },
        {
          filter: {
            match: true,
            regex: "^__typename$",
          },
          format: null,
          selector: ["objectLiteralProperty"],
        },
        {
          filter: {
            match: true,
            regex: "^__typename$",
          },
          format: null,
          selector: ["variable"],
        },
        {
          filter: {
            match: true,
            regex: "^__typename$",
          },
          format: null,
          selector: ["typeProperty"],
        },
        {
          format: ["camelCase", "UPPER_CASE"],
          modifiers: ["readonly"],
          selector: "classProperty",
        },
        {
          format: ["PascalCase", "UPPER_CASE"],
          selector: "enumMember",
        },
        {
          custom: {
            match: true,
            regex: "^data-.+$",
          },
          format: null,
          modifiers: ["requiresQuotes"],
          selector: "typeProperty",
        },
      ],
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-unnecessary-qualifier": "error",
      "@typescript-eslint/no-use-before-define": [
        "error",
        { classes: false, functions: false },
      ],
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/require-array-sort-compare": [
        "error",
        {
          ignoreStringArrays: true,
        },
      ],
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",

      // Doesn't work with Next.js
      "@typescript-eslint/dot-notation": "off",

      // Custom rules
      "custom/ban-date-comparison": "error",

      // eslint-plugin-functional
      "functional/immutable-data": "off",
      "functional/no-let": "off",
      "functional/no-loop-statements": "off",
      "functional/no-mixed-types": "off",
      "functional/no-return-void": "off",
      "functional/no-throw-statements": "off",
      "functional/type-declaration-immutability": "off",

      // eslint-plugin-import-x
      "import-x/no-anonymous-default-export": "error",
      "import-x/order": [
        "error",
        {
          alphabetize: { caseInsensitive: true, order: "asc" },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],

      // eslint-plugin-perfectionist
      "perfectionist/sort-imports": "off",
      "perfectionist/sort-modules": "off",
      "perfectionist/sort-objects": "off",
      "perfectionist/sort-union-types": "off",

      // eslint-plugin-unicorn
      "unicorn/no-abusive-eslint-disable": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-await-expression-member": "off",
      "unicorn/no-negated-condition": "off",
      "unicorn/no-null": "off",
      "unicorn/no-useless-undefined": ["error", { checkArguments: false }],
      "unicorn/prefer-top-level-await": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/text-encoding-identifier-case": "off", // very disputable, and probably should be utf-8 instead
    },
  },
  {
    ignores: defaultExportFiles,
    name: "my-music/ban-default-export",
    rules: {
      "import-x/no-default-export": "error",
    },
  },
);
