import functional from "eslint-plugin-functional";
import { flatConfigs as importPluginConfigs } from "eslint-plugin-import-x";
// @ts-expect-error: no types
import noTypeAssertion from "eslint-plugin-no-type-assertion";
import tseslint from "typescript-eslint";

import { custom } from "./custom-rules";

const typeScriptExtensions = [".ts", ".tsx"];

export const typescript = tseslint.config(
  // eslint-disable-next-line import-x/no-named-as-default-member
  tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: typeScriptExtensions.map((extension) => `**/*${extension}`),
  })),
  // eslint-disable-next-line import-x/no-named-as-default-member
  tseslint.configs.stylisticTypeChecked.map((config) => ({
    ...config,
    files: typeScriptExtensions.map((extension) => `**/*${extension}`),
  })),
  importPluginConfigs.typescript,
  {
    ...functional.configs.lite,
    files: typeScriptExtensions.map((extension) => `**/*${extension}`),
    name: "eslint-plugin-functional/lite",
  },
  {
    files: typeScriptExtensions.map((extension) => `**/*${extension}`),
    name: "my-music/typescript",
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      "no-type-assertion": noTypeAssertion,
      custom,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      // Already enabled in the shared config, but with adjusted options
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          caughtErrors: "all",
        },
      ],

      // The following rules are not available in the recommended preset,
      // but are still useful
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "default",
          format: ["camelCase"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
        },
        {
          selector: "import",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "variable",
          modifiers: ["const"],
          // PascalCase for React components
          // UPPER_CASE for constants
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
        },
        {
          selector: "variable",
          modifiers: ["destructured"],
          format: ["camelCase", "UPPER_CASE", "snake_case", "PascalCase"],
        },
        {
          selector: "function",
          // PascalCase for React components
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        {
          selector: "objectLiteralProperty",
          modifiers: ["requiresQuotes"],
          format: null,
        },
        {
          selector: "objectLiteralProperty",
          format: null,
          // Prisma properties can be a mix of camel and snake case
          filter: {
            regex: "^[a-z][A-Za-z0-9]*_[a-z][A-Za-z0-9]*$",
            match: true,
          },
        },
        {
          selector: [
            "objectLiteralProperty",
            "objectLiteralMethod",
            "parameter",
          ],
          // Required for REST responses, 3rd party APIs and AWS
          format: ["camelCase", "UPPER_CASE", "snake_case", "PascalCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: ["objectLiteralProperty"],
          format: null,
          filter: {
            regex: "^__esModule$",
            match: true,
          },
        },
        {
          selector: ["objectLiteralProperty"],
          format: null,
          filter: {
            regex: "^__html$",
            match: true,
          },
        },
        {
          selector: ["objectLiteralProperty"],
          format: null,
          filter: {
            regex: "^__typename$",
            match: true,
          },
        },
        {
          selector: ["variable"],
          format: null,
          filter: {
            regex: "^__typename$",
            match: true,
          },
        },
        {
          selector: ["typeProperty"],
          format: null,
          filter: {
            regex: "^__typename$",
            match: true,
          },
        },
        {
          selector: "classProperty",
          modifiers: ["readonly"],
          format: ["camelCase", "UPPER_CASE"],
        },
        {
          selector: "enumMember",
          format: ["PascalCase", "UPPER_CASE"],
        },
        {
          selector: "typeProperty",
          modifiers: ["requiresQuotes"],
          format: null,
          custom: {
            regex: "^data-.+$",
            match: true,
          },
        },
      ],
      "@typescript-eslint/no-use-before-define": [
        "error",
        { classes: false, functions: false },
      ],
      "no-type-assertion/no-type-assertion": "error",
      "functional/no-let": "off",
      "functional/no-loop-statements": "off",
      "functional/no-mixed-types": "off",
      "functional/no-return-void": "off",
      "functional/no-throw-statements": "off",
      "functional/type-declaration-immutability": "off",
      "functional/immutable-data": "off",

      // Already enabled in the shared config, but with adjusted options
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
      // Doesn't work with Next.js
      "@typescript-eslint/dot-notation": "off",

      // The following rules are not available in the recommended preset,
      // but are still useful
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-confusing-void-expression": "error",
      "@typescript-eslint/no-redundant-type-constituents": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unnecessary-qualifier": "error",
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

      // Custom rules
      "custom/ban-date-comparison": "error",
    },
  },
);
