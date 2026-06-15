import {
  personalBrandPackManifest,
  personalBrandPackPayload,
} from "./personal-brand-pack";

import type {
  MarketplacePackage,
} from "../marketplace-payload-types";

export const personalBrandPackage:
MarketplacePackage = {
  manifest:
    personalBrandPackManifest,

  payload:
    personalBrandPackPayload,
};