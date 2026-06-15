import { generateCopy } from "@/lib/kernel/copy/generate";

export async function POST(req: Request) {
  const body = await req.json();

  return Response.json(generateCopy(body.productName || ""));
}
