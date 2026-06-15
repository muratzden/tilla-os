import { NextRequest } from "next/server";

import { brandCore } from "../../../src/lib/engines/brand-core";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const input = {
      type: body.type ?? "",
      material: body.material ?? "",
      color: body.color ?? "",
      size: body.size ?? "",
      channel: body.channel ?? "web",
      brandId: body.brandId ?? "tilla-leather",
      uiLanguage: body.uiLanguage ?? "tr",
      contentLanguage: body.contentLanguage ?? "tr",
      promptLanguage: body.promptLanguage ?? "en",
      outputLanguage: body.outputLanguage,
      seed: body.seed,
    };

    const result = brandCore(input);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
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
