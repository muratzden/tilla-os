import type { MarketplacePackageType } from "./marketplace-package-types";

import { getMarketplacePayload } from "./marketplace-package-registry";

import { getActiveWorkspaceMarketplacePackageByType } from "./workspace-marketplace-registry";

export async function getActiveWorkspaceMarketplacePayloadByType(
  workspaceId: string,
  type: MarketplacePackageType,
) {
  const active = await getActiveWorkspaceMarketplacePackageByType(
    workspaceId,
    type,
  );

  if (!active) {
    return undefined;
  }

  return getMarketplacePayload(active.packageId)?.payload;
}

export async function getActiveWorkspaceIndustryPayload(workspaceId: string) {
  return getActiveWorkspaceMarketplacePayloadByType(workspaceId, "industry");
}

export async function getActiveWorkspaceLanguagePayload(workspaceId: string) {
  return getActiveWorkspaceMarketplacePayloadByType(workspaceId, "language");
}

export async function getActiveWorkspacePersonalBrandPayload(
  workspaceId: string,
) {
  return getActiveWorkspaceMarketplacePayloadByType(
    workspaceId,
    "personal_brand",
  );
}
