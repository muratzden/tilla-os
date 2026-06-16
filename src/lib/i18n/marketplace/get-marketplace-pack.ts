import { bootstrapMarketplace } from "@/src/lib/marketplace/bootstrap-marketplace";
import { getMarketplacePackage } from "@/src/lib/marketplace/marketplace-registry";

import type { ImportedLanguagePack } from "./marketplace-types";

import {
  sampleGermanMarketplacePack,
  sampleGermanMarketplacePackV110,
} from "./sample-german-pack";

const marketplacePacks: Record<string, Record<string, ImportedLanguagePack>> = {
  "de-marketplace": {
    "1.0.0": sampleGermanMarketplacePack,
    "1.1.0": sampleGermanMarketplacePackV110,
  },
};

export function getMarketplacePack(
  packId: string,
  version = "1.0.0",
): ImportedLanguagePack {
  bootstrapMarketplace();

  const marketplaceProduct = getMarketplacePackage(packId);

  if (!marketplaceProduct) {
    throw new Error(`Marketplace product '${packId}' was not found`);
  }

  if (marketplaceProduct.type !== "language") {
    throw new Error(`Marketplace product '${packId}' is not a language pack`);
  }

  const packVersions = marketplacePacks[packId];

  if (!packVersions) {
    throw new Error(
      `Language payload for marketplace product '${packId}' was not found`,
    );
  }

  const pack = packVersions[version];

  if (!pack) {
    throw new Error(
      `Marketplace pack '${packId}' version '${version}' was not found`,
    );
  }

  return pack;
}
