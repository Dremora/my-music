import tseslint from "typescript-eslint";

import { scriptsFiles } from "./config";

export const scripts = tseslint.config(
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
