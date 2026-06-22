import type { BrandSetup } from "./brand-setup-types";

export const defaultBrandSetup: BrandSetup = {
  identity: {
    brandName: "",
    category: "",
    country: "",
    foundedYear: undefined,

    interviewLanguage: "en",
    foundationLanguage: "en",
    promptLanguage: "en",
  },

  positioning: {
    premiumLevel: "",
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
      promptLanguage: "en",
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
