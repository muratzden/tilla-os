import type {
  MarketplacePackageType,
} from "./marketplace-package-types";

import {
  getMarketplacePayload,
} from "./marketplace-package-registry";

import {
  getActiveWorkspaceMarketplacePackageByType,
} from "./workspace-marketplace-registry";

export function getActiveWorkspaceMarketplacePayloadByType(
  workspaceId: string,
  type: MarketplacePackageType
) {
  const active =
    getActiveWorkspaceMarketplacePackageByType(
      workspaceId,
      type
    );

  if (!active) {
    return undefined;
  }

  return getMarketplacePayload(
    active.packageId
  )?.payload;
}

export function getActiveWorkspaceIndustryPayload(
  workspaceId: string
) {
  return getActiveWorkspaceMarketplacePayloadByType(
    workspaceId,
    "industry"
  );
}

export function getActiveWorkspaceLanguagePayload(
  workspaceId: string
) {
  return getActiveWorkspaceMarketplacePayloadByType(
    workspaceId,
    "language"
  );
}

export function getActiveWorkspacePersonalBrandPayload(
  workspaceId: string
) {
  return getActiveWorkspaceMarketplacePayloadByType(
    workspaceId,
    "personal_brand"
  );
}