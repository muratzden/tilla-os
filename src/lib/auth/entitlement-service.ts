import type {
  MarketplaceEntitlement,
} from "./auth-types";

import {
  grantEntitlement,
  getWorkspaceEntitlements,
} from "./user-storage";

export function grantMarketplaceEntitlement(
  workspaceId: string,
  packageId: string,
) {
  const entitlement: MarketplaceEntitlement = {
    workspaceId,
    packageId,
    grantedAt: new Date().toISOString(),
  };

  grantEntitlement(entitlement);

  return entitlement;
}

export function hasMarketplaceEntitlement(
  workspaceId: string,
  packageId: string,
) {
  return getWorkspaceEntitlements(workspaceId).some(
    (item) => item.packageId === packageId,
  );
}

export function getMarketplaceEntitlements(
  workspaceId: string,
) {
  return getWorkspaceEntitlements(workspaceId);
}