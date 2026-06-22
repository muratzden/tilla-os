import { NextRequest } from "next/server";

import { runBrandKernel } from "../../../src/lib/brand-kernel/brand-kernel";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const rawAnswers = [
      body.type,
      body.material,
      body.color,
      body.size,
      body.channel ?? "web",
    ].filter((value): value is string => Boolean(value));

    const kernel = await runBrandKernel({
      rawAnswers,
    });

    return new Response(
      JSON.stringify({
        success: true,
        kernel,
        missionControl: kernel.missionControl,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );
  } catch (error: any) {
    console.error("BRAND DECISION API ERROR:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || "brand_decision_error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );
  }
}
