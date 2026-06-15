import {
  marketplaceCatalog,
  type MarketplaceCatalogItem,
} from "./marketplace-catalog";

import {
  packageRegistry,
} from "./package-registry";

function enrichCatalogItem(
  item: MarketplaceCatalogItem
): MarketplaceCatalogItem {
  const registryEntry =
    packageRegistry[item.id];

  if (!registryEntry) {
    return item;
  }

  return {
    ...item,
    version: registryEntry.latestVersion,
  };
}

export function searchMarketplace(
  query = ""
): MarketplaceCatalogItem[] {
  const normalizedQuery =
    query.trim().toLowerCase();

  const catalog =
    marketplaceCatalog.map(enrichCatalogItem);

  if (!normalizedQuery) {
    return catalog;
  }

  return catalog.filter((item) => {
    return [
      item.id,
      item.languageCode,
      item.name,
      item.nativeName,
      item.description,
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  });
}