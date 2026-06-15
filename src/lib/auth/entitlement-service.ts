import type {
  MarketplaceEntitlement,
} from "./auth-types";

import {
  grantEntitlement,
  getWorkspaceEntitlements,
} from "./user-storage";

export async function grantMarketplaceEntitlement(
  workspaceId: string,
  packageId: string,
) {
  const entitlement: MarketplaceEntitlement = {
    workspaceId,
    packageId,
    grantedAt: new Date().toISOString(),
  };

  await grantEntitlement(entitlement);

  return entitlement;
}

export async function hasMarketplaceEntitlement(
  workspaceId: string,
  packageId: string,
) {
  const entitlements =
    await getWorkspaceEntitlements(workspaceId);

  return entitlements.some(
    (item) => item.packageId === packageId,
  );
}

export async function getMarketplaceEntitlements(
  workspaceId: string,
) {
  return getWorkspaceEntitlements(workspaceId);
}