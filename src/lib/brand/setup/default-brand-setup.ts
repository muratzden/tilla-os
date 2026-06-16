import type { BrandSetup } from "./brand-setup-types";

export const defaultBrandSetup: BrandSetup = {
  identity: {
    brandName: "",
    category: "",
    country: "TR",

    uiLanguage: "tr",
    contentLanguage: "tr",
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

export function normalizeBrandSetup(
  setup?: Partial<BrandSetup> | null,
): BrandSetup {
  return {
    ...defaultBrandSetup,
    ...setup,

    identity: {
      ...defaultBrandSetup.identity,
      ...setup?.identity,
    },

    positioning: {
      ...defaultBrandSetup.positioning,
      ...setup?.positioning,
    },

    audience: {
      ...defaultBrandSetup.audience,
      ...setup?.audience,
    },

    voice: {
      ...defaultBrandSetup.voice,
      ...setup?.voice,
    },

    visualDirection: {
      ...defaultBrandSetup.visualDirection,
      ...setup?.visualDirection,
    },

    values: {
      ...defaultBrandSetup.values,
      ...setup?.values,
    },

    manifesto: {
      ...defaultBrandSetup.manifesto,
      ...setup?.manifesto,
    },
  };
}
