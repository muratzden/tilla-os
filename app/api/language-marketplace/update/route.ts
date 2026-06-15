import { NextResponse } from "next/server";
import { updateLanguagePack } from "@/src/lib/i18n/marketplace/update-language-pack";

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
        }
      );
    }

    const result = updateLanguagePack(
      workspaceId,
      body.language
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
            : "Failed to update language pack",
      },
      {
        status: 500,
      }
    );
  }
}