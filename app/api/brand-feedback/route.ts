import { NextResponse } from "next/server";
import { recordFeedback } from "../../../src/lib/engines/brand-feedback";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = recordFeedback(body);

    return NextResponse.json({
      success: true,
      learning: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
