import { buildProductPrompt } from "@/lib/kernel/prompt/builder";

export async function POST(req: Request) {
  const body = await req.json();

  return Response.json({
    prompt: buildProductPrompt(body.productName || ""),
  });
}
