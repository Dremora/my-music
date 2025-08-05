import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

export default withVanillaExtract({
  compiler: {
    relay: {
      src: "./src",
      language: "typescript",
      artifactDirectory: "./src/generated/relay",
    },
  },
  experimental: {
    reactCompiler: true,
  },
});
