import eslintPluginNode from "eslint-plugin-n";
import tseslint from "typescript-eslint";

import { backendFiles } from "./config";

export const backend = tseslint.config(
  {
    ...eslintPluginNode.configs["flat/recommended-module"],
    files: backendFiles,
  },
  {
    files: backendFiles,
    name: "my-music/backend",
    rules: {
      "n/no-missing-import": "off",
      // TODO fix
      "n/no-extraneous-import": "off",
      "n/no-unsupported-features/node-builtins": [
        "error",
        {
          version: ">=22.0.0",
        },
      ],
      "n/prefer-promises/fs": "error",
      "no-console": "error",
    },
  },
);
