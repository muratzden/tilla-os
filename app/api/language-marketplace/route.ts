import { NextResponse } from "next/server";
import { getWorkspaceLanguageState } from "@/src/lib/i18n/marketplace/language-pack-storage";
import { getLatestPackageVersion } from "@/src/lib/i18n/marketplace/package-registry";

export async function GET() {
  try {
    const workspaceId = "tilla-leather";

    const state = getWorkspaceLanguageState(workspaceId);

    const installedLanguages = state.installed.map((language) => {
      const install = state.installs?.[language];

      const currentVersion = install?.version ?? "system";
      const packageId = install?.packageId;
      const latestVersion = packageId
        ? getLatestPackageVersion(packageId)
        : currentVersion;

      return {
        language,
        packageId,
        source: install?.source ?? "system",
        installedAt: install?.installedAt ?? null,
        currentVersion,
        latestVersion,
        updateAvailable:
          packageId !== undefined && currentVersion !== latestVersion,
        active: state.active === language,
      };
    });

    const updates = installedLanguages.filter(
      (language) => language.updateAvailable,
    );

    return NextResponse.json({
      active: state.active,
      installed: state.installed,
      installedLanguages,
      updates,
      versionHistory: state.versionHistory ?? [],
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to load language marketplace state",
      },
      {
        status: 500,
      },
    );
  }
}
