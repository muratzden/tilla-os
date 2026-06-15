import { runProductWorkflow } from "@/lib/kernel/workflow/product-workflow";

export async function POST(req: Request) {
  const body = await req.json();

  return Response.json(runProductWorkflow(body.productName || ""));
}
