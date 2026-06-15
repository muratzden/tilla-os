import { generateAIResponse } from "@/lib/kernel/ai/provider";

export async function POST(req: Request) {
  const body = await req.json();

  return Response.json(await generateAIResponse(body.prompt || ""));
}
