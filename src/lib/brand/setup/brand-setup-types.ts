export type PremiumLevel = "mass" | "mid" | "premium" | "luxury";

export type UiLanguage = "tr" | "en";

export type ContentLanguage = "tr" | "en" | "de";

export type PromptLanguage = "en";

export type BrandSetup = {
  identity: {
    brandName: string;
    category: string;
    country: string;
    foundedYear?: number;

    uiLanguage: UiLanguage;
    contentLanguage: ContentLanguage;
    promptLanguage: PromptLanguage;
  };

  positioning: {
    premiumLevel: PremiumLevel;
    marketPosition: string;
    priceSegment: string;
  };

  audience: {
    primaryAudience: string;
    secondaryAudience?: string;
  };

  voice: {
    tone: string;
    personality: string;
    communicationStyle: string;
  };

  visualDirection: {
    aesthetic: string;
    materials: string[];
    colors: string[];
  };

  values: {
    coreValues: string[];
    brandPromise: string;
    forbiddenDirections: string[];
  };

  manifesto: {
    founderStory: string;
    brandManifesto: string;
  };
};
