import bundleAnalyzer from "@next/bundle-analyzer";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withVanillaExtract(
  withBundleAnalyzer({
    ignoreDuringBuilds: true,
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: "/graphql",
          destination: process.env.API_URL,
        },
      ];
    },
  })
);
