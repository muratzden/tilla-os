import type { BrandSetup } from "./brand-setup-types";

function hasText(value?: string) {
  return Boolean(value && value.trim().length > 0);
}

function hasItems(value?: string[]) {
  return Boolean(value && value.length > 0);
}

export function calculateBrandReadiness(setup: BrandSetup) {
  const sections = {
    identity: [
      hasText(setup.identity.brandName),
      hasText(setup.identity.category),
      hasText(setup.identity.country),
    ],

    positioning: [
      hasText(setup.positioning.premiumLevel),
      hasText(setup.positioning.marketPosition),
      hasText(setup.positioning.priceSegment),
    ],

    audience: [hasText(setup.audience.primaryAudience)],

    voice: [
      hasText(setup.voice.tone),
      hasText(setup.voice.personality),
      hasText(setup.voice.communicationStyle),
    ],

    visualDirection: [
      hasText(setup.visualDirection.aesthetic),
      hasItems(setup.visualDirection.materials),
      hasItems(setup.visualDirection.colors),
    ],

    values: [
      hasItems(setup.values.coreValues),
      hasText(setup.values.brandPromise),
      hasItems(setup.values.forbiddenDirections),
    ],

    manifesto: [
      hasText(setup.manifesto.founderStory),
      hasText(setup.manifesto.brandManifesto),
    ],
  };

  const sectionScores = Object.fromEntries(
    Object.entries(sections).map(([key, checks]) => {
      const passed = checks.filter(Boolean).length;
      const score = Math.round((passed / checks.length) * 100);

      return [key, score];
    }),
  );

  const total =
    Object.values(sectionScores).reduce(
      (sum, score) => sum + Number(score),
      0,
    ) / Object.keys(sectionScores).length;

  return {
    score: Math.round(total),
    sections: sectionScores,
  };
}
