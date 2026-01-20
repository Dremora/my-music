import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

export default withVanillaExtract({
  outputFileTracingExcludes: {
    "*": ["**/*.css.ts.vanilla.css"],
  },
  compiler: {
    relay: {
      src: "./src",
      language: "typescript",
      artifactDirectory: "./src/generated/relay",
    },
  },
  reactCompiler: true,
});
