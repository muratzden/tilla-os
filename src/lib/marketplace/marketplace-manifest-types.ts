import type { MarketplacePackageType } from "./marketplace-package-types";
import type { MarketplaceEntitlement } from "./marketplace-entitlements";

export type MarketplaceManifest = {
  id: string;

  type: MarketplacePackageType;

  name: string;

  nativeName?: string;

  description: string;

  version: string;

  author: string;

  publisher: string;

  website?: string;

  supportEmail?: string;

  license?: string;

  price: number;

  currency: string;

  requiredEntitlement: MarketplaceEntitlement;

  categories: string[];

  tags: string[];

  screenshots: string[];

  featured: boolean;

  downloads: number;

  rating: number;
};