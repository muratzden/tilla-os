import type { BrandSetup } from "./brand-setup-types";

export const defaultBrandSetup: BrandSetup = {
  identity: {
    brandName: "",
    category: "",
    country: "TR",

    interviewLanguage: "en",
    foundationLanguage: "en",
    promptLanguage: "en",
  },

  positioning: {
    premiumLevel: "premium",
    marketPosition: "",
    priceSegment: "",
  },

  audience: {
    primaryAudience: "",
    secondaryAudience: "",
  },

  voice: {
    tone: "",
    personality: "",
    communicationStyle: "",
  },

  visualDirection: {
    aesthetic: "",
    materials: [],
    colors: [],
  },

  values: {
    coreValues: [],
    brandPromise: "",
    forbiddenDirections: [],
  },

  manifesto: {
    founderStory: "",
    brandManifesto: "",
  },
};
