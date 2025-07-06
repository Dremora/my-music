import eslintPluginNode from "eslint-plugin-n";
import tseslint from "typescript-eslint";

import { backendFiles, scriptsFiles } from "./config";

export const backend = tseslint.config(
  {
    ...eslintPluginNode.configs["flat/recommended-module"],
    files: [...backendFiles, ...scriptsFiles],
  },
  {
    files: [...backendFiles, ...scriptsFiles],
    name: "my-music/backend",
    rules: {
      "n/no-missing-import": "off",
      "n/prefer-promises/fs": "error",
      "no-console": "error",
    },
  },
);
