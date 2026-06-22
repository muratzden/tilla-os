import { NextResponse } from "next/server";

import { getIntelligenceMarketplace } from "@/src/lib/intelligence-marketplace/get-intelligence-marketplace";

export async function GET() {
  const marketplace = getIntelligenceMarketplace();

  return NextResponse.json({
    ok: true,
    marketplace,
  });
}
