import { checkReadiness } from "@/api/prisma";

export async function GET(): Promise<Response> {
  const ready = await checkReadiness();

  return Response.json(
    { status: ready ? "ok" : "error" },
    { status: ready ? 200 : 503 },
  );
}
