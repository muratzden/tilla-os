import { getBrandProfile } from "@/lib/kernel/memory/brand";

export async function GET() {
  return Response.json(getBrandProfile());
}
