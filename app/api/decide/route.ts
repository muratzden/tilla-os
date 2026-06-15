import { decide } from "@/lib/kernel/decisions/engine";

export async function POST(req: Request) {
  const body = await req.json();

  const context = {
    input: body.input || "",
    intent: body.intent || "unknown",
    tone: body.tone || "artisan_premium",
  };

  const result = decide(context);

  return Response.json(result);
}
