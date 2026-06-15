import { runBrandBrainAIWorkflow } from "@/lib/kernel/workflow/brand-brain-ai-workflow";

export async function POST(req: Request) {
  const body = await req.json();

  return Response.json(
    await runBrandBrainAIWorkflow(
      body.task || "product_copy",
      body.productName || "",
      body.productType || "unknown",
    ),
  );
}
