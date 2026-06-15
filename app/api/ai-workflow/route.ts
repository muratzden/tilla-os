import { runAIProductWorkflow } from "@/lib/kernel/workflow/ai-product-workflow";

export async function POST(req: Request) {
  const body = await req.json();

  return Response.json(await runAIProductWorkflow(body.productName || ""));
}
