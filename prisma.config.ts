import { config as loadEnv } from "dotenv";
import { defineConfig, env } from "prisma/config";

loadEnv({ path: ".env.local", quiet: true });
loadEnv({ quiet: true });

const shadowDatabaseUrl = process.env.SHADOW_DATABASE_URL;

const hasShadowDatabaseUrl =
  shadowDatabaseUrl !== undefined && shadowDatabaseUrl.length > 0;

export default defineConfig({
  schema: "prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
    ...(hasShadowDatabaseUrl ? { shadowDatabaseUrl } : {}),
  },
});
