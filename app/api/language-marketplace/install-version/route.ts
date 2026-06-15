import { NextResponse } from "next/server";
import { installSpecificLanguagePackVersion } from "@/src/lib/i18n/marketplace/install-specific-language-pack-version";
import type { OutputLanguage } from "@/src/lib/i18n/language";

export async function POST(request: Request) {
  try {
    const workspaceId = "tilla-leather";
    const body = await request.json();

    if (!body.packageId || typeof body.packageId !== "string") {
      return NextResponse.json(
        { error: "Package id is required" },
        { status: 400 }
      );
    }

    if (!body.language || typeof body.language !== "string") {
      return NextResponse.json(
        { error: "Language is required" },
        { status: 400 }
      );
    }

    if (!body.version || typeof body.version !== "string") {
      return NextResponse.json(
        { error: "Version is required" },
        { status: 400 }
      );
    }

    const result = installSpecificLanguagePackVersion(
      workspaceId,
      body.packageId,
      body.language as OutputLanguage,
      body.version
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
            : "Failed to install language pack version",
      },
      { status: 500 }
    );
  }
}