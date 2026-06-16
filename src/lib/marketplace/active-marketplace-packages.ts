import type { MarketplacePackageType } from "./marketplace-package-types";

import type { InstalledMarketplacePackage } from "./marketplace-installation-types";

import { getInstalledPackages } from "./marketplace-installation-registry";

export function getActiveMarketplacePackages() {
  return getInstalledPackages().filter((pkg) => pkg.active);
}

export function getActiveMarketplacePackagesByType(
  type: MarketplacePackageType,
) {
  return getActiveMarketplacePackages().filter((pkg) => pkg.type === type);
}

export function getActiveMarketplacePackageByType(
  type: MarketplacePackageType,
): InstalledMarketplacePackage | undefined {
  return getActiveMarketplacePackagesByType(type)[0];
}

export function getActiveLanguagePackage() {
  return getActiveMarketplacePackageByType("language");
}

export function getActiveIndustryPackage() {
  return getActiveMarketplacePackageByType("industry");
}

export function getActivePersonalBrandPackage() {
  return getActiveMarketplacePackageByType("personal_brand");
}
