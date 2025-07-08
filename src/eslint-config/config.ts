export const ignoredFiles = ["**/.next", "**/dist", "src/generated"];
export const scriptsFiles = [];
export const frontendFiles = ["src/**"];
export const backendCommonJsFiles = [];
export const backendEsmFiles = [
  "next.config.ts",
  "eslint.config.ts",
  "src/eslint-config/**",
  "src/api/**",
];
export const backendFiles = [...backendEsmFiles, ...backendCommonJsFiles];
