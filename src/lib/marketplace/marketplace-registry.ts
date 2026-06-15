import type { MarketplaceManifest } from "./marketplace-manifest-types";

const marketplaceRegistry = new Map<string, MarketplaceManifest>();

export function registerMarketplacePackage(
  manifest: MarketplaceManifest
) {
  marketplaceRegistry.set(manifest.id, manifest);
}

export function getMarketplacePackage(
  packageId: string
) {
  return marketplaceRegistry.get(packageId);
}

export function getMarketplacePackages() {
  return Array.from(
    marketplaceRegistry.values()
  );
}