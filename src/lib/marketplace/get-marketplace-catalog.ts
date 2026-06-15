import { getMarketplacePackages } from "./marketplace-registry";

export function getMarketplaceCatalog() {
  return getMarketplacePackages();
}

export function getFeaturedMarketplacePackages() {
  return getMarketplacePackages().filter(
    (pkg) => pkg.featured
  );
}

export function getMarketplacePackagesByType(
  type: string
) {
  return getMarketplacePackages().filter(
    (pkg) => pkg.type === type
  );
}

export function searchMarketplacePackages(
  query: string
) {
  const normalized = query.toLowerCase();

  return getMarketplacePackages().filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(normalized) ||
      pkg.description
        .toLowerCase()
        .includes(normalized)
  );
}