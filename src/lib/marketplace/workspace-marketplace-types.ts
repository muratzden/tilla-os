import type { MarketplacePackageType } from "./marketplace-package-types";

import type { MarketplaceEntitlement } from "./marketplace-entitlements";

export type WorkspaceMarketplaceInstallation = {
  workspaceId: string;

  packageId: string;

  type: MarketplacePackageType;

  version: string;

  entitlement: MarketplaceEntitlement;

  active: boolean;

  installedAt: string;
};
