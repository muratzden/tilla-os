import { inferProductMeaning } from "@/lib/kernel/product-meaning/engine";

export async function POST(req: Request) {
  const body = await req.json();

  return Response.json(inferProductMeaning(body.productType || ""));
}
