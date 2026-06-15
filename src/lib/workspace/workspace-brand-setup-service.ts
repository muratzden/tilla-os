import type { BrandSetup } from "@/src/lib/brand/setup/brand-setup-types";
import {
  getWorkspaceSettings,
  upsertWorkspaceSettings,
} from "./workspace-settings-storage";

export function getWorkspaceBrandSetup(
  workspaceId: string
): BrandSetup | null {
  const settings = getWorkspaceSettings(workspaceId);

  return settings?.brandSetup ?? null;
}

export function saveWorkspaceBrandSetup(
  workspaceId: string,
  brandSetup: BrandSetup
): BrandSetup {
  const existing = getWorkspaceSettings(workspaceId);

  upsertWorkspaceSettings({
    workspaceId,
    brandSetup,
    updatedAt: new Date().toISOString(),
    ...existing,
  });

  return brandSetup;
}
