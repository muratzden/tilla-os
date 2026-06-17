import { getBrandSetup } from "./get-brand-setup";

export function getBrandProfile(brandId?: string) {
  const setup = getBrandSetup(brandId);

  return {
    name: setup.identity.brandName,
    category: setup.identity.category,
    premiumLevel: setup.positioning.premiumLevel,
    audience: setup.audience.primaryAudience,
    tone: setup.voice.tone,
    personality: setup.voice.personality,
    aesthetic: setup.visualDirection.aesthetic,
    values: setup.values.coreValues,
    forbiddenDirections: setup.values.forbiddenDirections,
    manifesto: setup.manifesto.brandManifesto,
    interviewLanguage: setup.identity.interviewLanguage,
foundationLanguage: setup.identity.foundationLanguage,
    promptLanguage: setup.identity.promptLanguage,
  };
}
