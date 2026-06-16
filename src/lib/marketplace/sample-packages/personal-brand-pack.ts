import type { MarketplaceManifest } from "../marketplace-manifest-types";
import type { PersonalBrandMarketplacePayload } from "../marketplace-payload-types";

export const personalBrandPackManifest: MarketplaceManifest = {
  id: "personal-brand-founder-pack",

  type: "personal_brand",

  name: "Founder Personal Brand Pack",

  description:
    "Personal brand foundation pack for founders, makers, consultants, and solo operators.",

  version: "0.1.0",

  author: "TILLA Marketplace",

  publisher: "TILLA OS",

  price: 39,

  currency: "USD",

  requiredEntitlement: "purchased",

  categories: ["personal_brand"],

  tags: ["founder", "creator", "consultant", "solo business"],

  screenshots: [],

  featured: false,

  downloads: 0,

  rating: 5,
};

export const personalBrandPackPayload: PersonalBrandMarketplacePayload = {
  type: "personal_brand",

  personaTypes: ["founder", "maker", "consultant", "solo_operator"],

  contentPillars: [
    "point_of_view",
    "proof_of_work",
    "behind_the_scenes",
    "offer_education",
  ],

  recommendedChannels: [
    "linkedin",
    "instagram",
    "youtube_shorts",
    "newsletter",
  ],
};
