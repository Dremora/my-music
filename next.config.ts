import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

export default withVanillaExtract({
  reactStrictMode: true,
  // eslint-disable-next-line @typescript-eslint/require-await
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: process.env.API_URL ?? "",
      },
    ];
  },
});
