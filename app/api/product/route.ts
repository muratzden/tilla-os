import { classifyProduct } from "@/lib/kernel/product/classify";

export async function POST(req: Request) {
  const body = await req.json();

  return Response.json({
    title: body.title,
    type: classifyProduct(body.title || ""),
  });
}
