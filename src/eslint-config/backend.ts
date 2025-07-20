import eslintPluginNode from "eslint-plugin-n";
import tseslint from "typescript-eslint";

import {
  backendCommonJsFiles,
  backendEsmFiles,
  backendFiles,
  scriptsFiles,
} from "./config";

export const backend = tseslint.config(
  backendEsmFiles.length > 0
    ? {
        ...eslintPluginNode.configs["flat/recommended-module"],
        files: [...backendEsmFiles],
      }
    : [],
  backendCommonJsFiles.length > 0
    ? {
        ...eslintPluginNode.configs["flat/recommended-script"],
        files: [...backendCommonJsFiles],
      }
    : [],
  {
    files: [...backendFiles],
    name: "my-music/backend",
    rules: {
      "n/no-missing-import": "off",
      "n/prefer-promises/fs": "error",
      "no-console": ["error", {}],
    },
  },
  scriptsFiles.length > 0
    ? {
        name: "my-music/scripts",
        files: scriptsFiles,
        rules: {
          "no-console": "off",
          "n/no-process-exit": "off",
          "unicorn/no-process-exit": "off",
        },
      }
    : [],
);
