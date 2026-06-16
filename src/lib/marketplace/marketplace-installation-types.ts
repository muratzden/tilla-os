import type { MarketplaceEntitlement } from "./marketplace-entitlements";

import type { MarketplacePackageType } from "./marketplace-package-types";

export type InstalledMarketplacePackage = {
  packageId: string;

  type: MarketplacePackageType;

  installedAt: string;

  active: boolean;

  entitlement: MarketplaceEntitlement;

  version: string;
};
