import {
  getMarketplacePayload,
} from "./marketplace-package-registry";

import {
  getActiveLanguagePackage,
  getActiveIndustryPackage,
  getActivePersonalBrandPackage,
} from "./active-marketplace-packages";

export function getActiveLanguagePayload() {
  const active = getActiveLanguagePackage();

  if (!active) {
    return undefined;
  }

  return getMarketplacePayload(
    active.packageId
  )?.payload;
}

export function getActiveIndustryPayload() {
  const active = getActiveIndustryPackage();

  if (!active) {
    return undefined;
  }

  return getMarketplacePayload(
    active.packageId
  )?.payload;
}

export function getActivePersonalBrandPayload() {
  const active = getActivePersonalBrandPackage();

  if (!active) {
    return undefined;
  }

  return getMarketplacePayload(
    active.packageId
  )?.payload;
}