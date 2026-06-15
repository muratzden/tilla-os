import type { BrandSetup } from "./brand-setup-types";

export const defaultBrandSetup: BrandSetup = {
  identity: {
    brandName: "Tilla Leather",
    category: "Leather Goods",
    country: "TR",
    foundedYear: 2021,
    uiLanguage: "tr",
    contentLanguage: "tr",
    promptLanguage: "en",
  },

  positioning: {
    premiumLevel: "premium",
    marketPosition: "Handcrafted leather goods brand",
    priceSegment: "Premium",
  },

  audience: {
    primaryAudience: "Professionals seeking timeless leather products",

    secondaryAudience: "Craft and heritage enthusiasts",
  },

  voice: {
    tone: "Warm",
    personality: "Craftsman",
    communicationStyle: "Honest and transparent",
  },

  visualDirection: {
    aesthetic: "Quiet Luxury",

    materials: ["Leather", "Brass", "Cotton"],

    colors: ["Black", "Camel", "Brown"],
  },

  values: {
    coreValues: ["Craftsmanship", "Longevity", "Honesty"],

    brandPromise: "Products that gain character through use",

    forbiddenDirections: ["Fast Fashion", "Mass Production"],
  },

  manifesto: {
    founderStory: "Founded as a family leather workshop",

    brandManifesto: "Human craft over industrial perfection",
  },
};
