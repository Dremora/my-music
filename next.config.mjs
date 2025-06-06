import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

export default withVanillaExtract({
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
});
