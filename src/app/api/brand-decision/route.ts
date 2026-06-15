import { NextResponse } from "next/server";
import { brandCore } from "../../../lib/engines/brand-core";

export async function POST(req: Request) {
  try {
    const input = await req.json();
    const result = brandCore(input);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("BRAND DECISION API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "brand_decision_error",
      },
      { status: 500 },
    );
  }
}
