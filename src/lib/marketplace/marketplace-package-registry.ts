import type {
  MarketplacePackage,
  MarketplacePayload,
} from "./marketplace-payload-types";

const packageRegistry = new Map<string, MarketplacePackage>();

export function registerMarketplacePayload(pkg: MarketplacePackage) {
  packageRegistry.set(pkg.manifest.id, pkg);
}

export function getMarketplacePayload(packageId: string) {
  return packageRegistry.get(packageId);
}

export function getMarketplacePayloads() {
  return Array.from(packageRegistry.values());
}

export function hasMarketplacePayload(packageId: string) {
  return packageRegistry.has(packageId);
}
