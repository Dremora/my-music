// @ts-expect-error: missing types
import { flatConfig } from "@next/eslint-plugin-next";
import restrictedGlobals from "confusing-browser-globals";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
// eslint-disable-next-line import-x/default
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
// @ts-expect-error: missing types
import relayPlugin from "eslint-plugin-relay";
import globals from "globals";
import tseslint from "typescript-eslint";

import { backendFiles, frontendFiles } from "./config";

export const frontend = tseslint.config(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  {
    name: "my-music/relay",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...relayPlugin.configs["ts-strict"],
    files: frontendFiles,
    ignores: backendFiles,
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      relay: relayPlugin,
    },
  },
  {
    ...jsxA11y.flatConfigs.strict,
    files: frontendFiles,
    ignores: backendFiles,
  },
  {
    ...reactPlugin.configs.flat.all,
    name: "eslint-plugin-react/flat.all",
    files: frontendFiles,
    ignores: backendFiles,
  },
  {
    ...reactPlugin.configs.flat["jsx-runtime"],
    name: "eslint-plugin-react/flat.jsx-runtime",
    files: frontendFiles,
    ignores: backendFiles,
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...flatConfig.coreWebVitals,
    name: "next/flat.coreWebVitals",
    files: frontendFiles,
    ignores: backendFiles,
  },
  {
    files: frontendFiles,
    ignores: backendFiles,
    name: "my-music/frontend",
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "jsx-a11y/no-autofocus": "off",
      "no-restricted-globals": ["error", ...restrictedGlobals],
      "jsx-a11y/control-has-associated-label": "error",
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
      "react/forbid-component-props": ["error", { forbid: [] }],
      "react/jsx-filename-extension": [
        "error",
        { allow: "as-needed", extensions: ["tsx"] },
      ],
      "react/jsx-max-depth": "off",
      "react/jsx-no-bind": "off", // annoying for now
      "react/jsx-no-leaked-render": "off",
      "react/jsx-no-literals": "off",
      "react/no-multi-comp": "off",
      "react/require-default-props": "off",
      "react/style-prop-object": "off", // we use style property for Text
    },
  },
);
