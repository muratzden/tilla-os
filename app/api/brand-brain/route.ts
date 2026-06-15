import { runBrandBrain } from "@/lib/kernel/brand-decision/brand-brain";

export async function POST(req: Request) {
  const body = await req.json();

  return Response.json(
    runBrandBrain(
      body.task || "product_copy",
      body.productName || "",
      body.productType || "unknown",
    ),
  );
}
