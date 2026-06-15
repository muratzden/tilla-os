import { getMemory } from "@/lib/kernel/memory/store";

export async function GET() {
  return Response.json(getMemory());
}
