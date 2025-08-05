import path from "node:path";

import * as dotenv from "dotenv";
import { expand } from "dotenv-expand";
import type { PrismaConfig } from "prisma";

// Load environment variables in development
if (process.env.NODE_ENV !== "production") {
  expand(dotenv.config({ path: ".env.development" }));
}

export default {
  schema: path.join("prisma"),
} satisfies PrismaConfig;
