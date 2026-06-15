import { generateScene } from "@/lib/kernel/visual/scene";

export async function POST(req: Request) {
  const body = await req.json();

  return Response.json({
    scene: generateScene(body.productName || ""),
  });
}
