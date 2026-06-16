import { deOutputPack } from "../output-packs/packs/de";
import type { ImportedLanguagePack } from "./marketplace-types";
import { signLanguagePack } from "./sign-language-pack";

const unsignedSampleGermanMarketplacePackV100: ImportedLanguagePack = {
  manifest: {
    id: "de-marketplace",
    name: "German Language Pack",
    nativeName: "Deutsch",
    description: "German language pack imported from marketplace",
    languageCode: "de",
    source: "marketplace",

    version: {
      schemaVersion: "1.0.0",
      packVersion: "1.0.0",
      minRuntimeVersion: "1.0.0",
    },
  },

  outputPack: {
    ...deOutputPack,
    meta: {
      ...deOutputPack.meta,
      status: "installed",
      source: "marketplace",
    },
  },
};

const unsignedSampleGermanMarketplacePackV110: ImportedLanguagePack = {
  manifest: {
    id: "de-marketplace",
    name: "German Language Pack",
    nativeName: "Deutsch",
    description: "German language pack imported from marketplace",
    languageCode: "de",
    source: "marketplace",

    version: {
      schemaVersion: "1.0.0",
      packVersion: "1.1.0",
      minRuntimeVersion: "1.0.0",
    },
  },

  outputPack: {
    ...deOutputPack,
    meta: {
      ...deOutputPack.meta,
      status: "installed",
      source: "marketplace",
      version: "1.1.0",
    },
  },
};

export const sampleGermanMarketplacePack = signLanguagePack(
  unsignedSampleGermanMarketplacePackV100,
);

export const sampleGermanMarketplacePackV110 = signLanguagePack(
  unsignedSampleGermanMarketplacePackV110,
);
