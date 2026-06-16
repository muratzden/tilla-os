import { NextResponse } from "next/server";
import { rollbackLanguagePack } from "@/src/lib/i18n/marketplace/rollback-language-pack";
import type { OutputLanguage } from "@/src/lib/i18n/language";

export async function POST(request: Request) {
  try {
    const workspaceId = "tilla-leather";
    const body = await request.json();

    if (!body.language || typeof body.language !== "string") {
      return NextResponse.json(
        {
          error: "Language is required",
        },
        {
          status: 400,
        },
      );
    }

    const result = rollbackLanguagePack(
      workspaceId,
      body.language as OutputLanguage,
    );

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to rollback language pack",
      },
      {
        status: 500,
      },
    );
  }
}
