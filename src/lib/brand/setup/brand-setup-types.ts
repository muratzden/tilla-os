export type BrandInterviewLanguage = "tr" | "en" | "de" | "fr" | "es" | "it";

export type CoreOperatingLanguage = "en";

export type BrandSetup = {
  identity: {
    brandName: string;
    category: string;
    country: string;
    foundedYear?: number;

    /**
     * Free multilingual intake language.
     * This is NOT the paid app UI language.
     */
   interviewLanguage: BrandInterviewLanguage;

    /**
     * Free setup/manifesto intake language.
     * Paid output intelligence belongs to marketplace packs.
     */
    foundationLanguage: BrandInterviewLanguage;

    /**
     * Internal system prompt language stays English.
     */
    promptLanguage: CoreOperatingLanguage;
  };

  positioning: {
    premiumLevel: string;
    marketPosition: string;
    priceSegment: string;
  };

  audience: {
    primaryAudience: string;
    secondaryAudience: string;
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