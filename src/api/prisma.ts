import { PrismaClient } from "@/generated/prisma/client";

let prisma: PrismaClient | undefined;

export function getPrismaClient(): PrismaClient {
  prisma ??= new PrismaClient({
    log:
      process.env["NODE_ENV"] === "development"
        ? ["query", "info", "warn"]
        : ["warn"],
  });

  return prisma;
}

export async function checkReadiness(): Promise<boolean> {
  try {
    await getPrismaClient().$queryRaw`SELECT 1`;

    return true;
  } catch (error) {
    console.error("Readiness check failed:", error);

    return false;
  }
}
