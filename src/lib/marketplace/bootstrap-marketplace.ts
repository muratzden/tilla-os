import { registerMarketplacePackage } from "./marketplace-registry";

import { registerMarketplacePayload } from "./marketplace-package-registry";

import { germanLanguagePack } from "./sample-packages/german-language-pack";

import { restaurantIndustryPackManifest } from "./sample-packages/restaurant-industry-pack";

import { personalBrandPackManifest } from "./sample-packages/personal-brand-pack";

import { germanLanguagePackage } from "./sample-packages/german-language-package";

import { restaurantIndustryPackage } from "./sample-packages/restaurant-industry-package";

import { personalBrandPackage } from "./sample-packages/personal-brand-package";

let initialized = false;

export function bootstrapMarketplace() {
  if (initialized) {
    return;
  }

  registerMarketplacePackage(germanLanguagePack);

  registerMarketplacePackage(restaurantIndustryPackManifest);

  registerMarketplacePackage(personalBrandPackManifest);

  registerMarketplacePayload(germanLanguagePackage);

  registerMarketplacePayload(restaurantIndustryPackage);

  registerMarketplacePayload(personalBrandPackage);

  initialized = true;
}
