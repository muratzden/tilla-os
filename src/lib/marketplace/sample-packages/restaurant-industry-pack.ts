import type { MarketplaceManifest } from "../marketplace-manifest-types";
import type { IndustryMarketplacePayload } from "../marketplace-payload-types";

export const restaurantIndustryPackManifest: MarketplaceManifest = {
  id: "restaurant-industry-pack",

  type: "industry",

  name: "Restaurant Industry Pack",

  description:
    "Industry foundation pack for restaurants, cafes, bistros, and hospitality food brands.",

  version: "0.1.0",

  author: "TILLA Marketplace",

  publisher: "TILLA OS",

  price: 49,

  currency: "USD",

  requiredEntitlement: "purchased",

  categories: ["industry", "restaurant", "hospitality"],

  tags: ["restaurant", "cafe", "menu", "hospitality", "food"],

  screenshots: [],

  featured: true,

  downloads: 0,

  rating: 5,
};

export const restaurantIndustryPackPayload: IndustryMarketplacePayload = {
  type: "industry",

  industryId: "restaurant",

  industryName: "Restaurant",

  defaultArchetypes: ["warm_host", "local_craft", "premium_hospitality"],

  defaultWorlds: ["neighborhood_table", "open_kitchen", "slow_evening"],

  recommendedChannels: ["instagram", "google_business", "menu", "local_ads"],
};
