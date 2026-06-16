import {
  restaurantIndustryPackManifest,
  restaurantIndustryPackPayload,
} from "./restaurant-industry-pack";

import type { MarketplacePackage } from "../marketplace-payload-types";

export const restaurantIndustryPackage: MarketplacePackage = {
  manifest: restaurantIndustryPackManifest,

  payload: restaurantIndustryPackPayload,
};
