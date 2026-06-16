import type { BrandSetup } from "@/src/lib/brand/setup/brand-setup-types";

import {
  getWorkspaceSettings,
  upsertWorkspaceSettings,
} from "./workspace-settings-storage";

export async function getWorkspaceBrandSetup(
  workspaceId: string,
): Promise<BrandSetup | null> {
  const settings = await getWorkspaceSettings(workspaceId);

  return settings?.brandSetup ?? null;
}

export async function saveWorkspaceBrandSetup(
  workspaceId: string,
  brandSetup: BrandSetup,
): Promise<BrandSetup> {
  const existing = await getWorkspaceSettings(workspaceId);

  await upsertWorkspaceSettings({
    ...existing,
    workspaceId,
    brandSetup,
    updatedAt: new Date().toISOString(),
  });

  return brandSetup;
}
