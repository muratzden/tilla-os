import type {
  MarketplaceEntitlement,
} from "./marketplace-entitlements";

import type {
  InstalledMarketplacePackage,
} from "./marketplace-installation-types";

import {
  loadMarketplaceInstallations,
  saveMarketplaceInstallations,
} from "./marketplace-storage";

import type {
  MarketplacePackageType,
} from "./marketplace-package-types";

const installations = new Map<
  string,
  InstalledMarketplacePackage
>();

let loaded = false;

function ensureLoaded() {
  if (loaded) {
    return;
  }

  for (const installation of loadMarketplaceInstallations()) {
    installations.set(
      installation.packageId,
      installation
    );
  }

  loaded = true;
}

function persist() {
  saveMarketplaceInstallations(
    Array.from(installations.values())
  );
}

export function installMarketplacePackage(
  packageId: string,
  type: MarketplacePackageType,
  version: string,
  entitlement: MarketplaceEntitlement = "free"
)  {
  ensureLoaded();

  installations.set(packageId, {
    packageId,
	type,
    version,
    entitlement,

    active: false,

    installedAt:
      new Date().toISOString(),
  });

  persist();
}

export function getInstalledPackage(
  packageId: string
) {
  ensureLoaded();

  return installations.get(packageId);
}

export function getInstalledPackages() {
  ensureLoaded();

  return Array.from(
    installations.values()
  );
}

export function isPackageInstalled(
  packageId: string
) {
  ensureLoaded();

  return installations.has(packageId);
}

export function saveInstalledPackages() {
  ensureLoaded();
  persist();
}