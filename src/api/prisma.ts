import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "./generated/prisma";

if (process.env.DATABASE_URL === undefined) {
  throw new Error("DATABASE_URL is not set");
}

let driver;

if (process.env.DATABASE_URL.includes("neon.tech")) {
  console.info("Using Neon adapter");
  driver = PrismaNeon;
} else {
  console.info("Using Postgres adapter");
  driver = PrismaPg;
}

const adapter = new driver({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({
  adapter,
  log: ["query", "warn", "error", "info"],
});
