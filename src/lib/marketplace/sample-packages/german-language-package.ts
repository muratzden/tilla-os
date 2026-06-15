import { germanLanguagePack }
from "./german-language-pack";

import type {
  MarketplacePackage,
} from "../marketplace-payload-types";

export const germanLanguagePackage:
MarketplacePackage = {
  manifest: germanLanguagePack,

  payload: {
    type: "language",

    languageCode: "de",

    outputPackId: "de",
  },
};