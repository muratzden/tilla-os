import type { BrandSetup } from "./brand-setup-types";
import { defaultBrandSetup } from "./default-brand-setup";

export function getBrandProfile(setup: BrandSetup = defaultBrandSetup) {
  return {
    name: setup.identity.brandName,
    category: setup.identity.category,
    premiumLevel: setup.positioning.premiumLevel,
    audience: setup.audience.primaryAudience,
    tone: setup.voice.tone,
    personality: setup.voice.personality,
    aesthetic: setup.visualDirection.aesthetic,
    materials: setup.visualDirection.materials,
    values: setup.values.coreValues,
    manifesto: setup.manifesto.brandManifesto,

    promptLanguage: setup.identity.promptLanguage,
  };
}
