import { createArtDirection } from "@/lib/kernel/art-direction/engine";

export async function POST(req: Request) {
  const body = await req.json();

  return Response.json(
    createArtDirection(body.identity || "artisan", body.emotion || "quality"),
  );
}
