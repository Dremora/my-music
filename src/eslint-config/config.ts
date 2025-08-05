export const ignoredFiles = ["**/.next", "**/dist", "src/generated"];
export const scriptsFiles = [];
export const frontendFiles = ["src/**"];
export const backendCommonJsFiles = [];
export const backendEsmFiles = [
  "eslint.config.ts",
  "next.config.ts",
  "src/api/**",
  "src/eslint-config/**",
];
export const defaultExportFiles = [
  "eslint.config.ts",
  "next.config.ts",
  "prisma.config.ts",
  "src/app/**",
];
export const backendFiles = [...backendEsmFiles, ...backendCommonJsFiles];
