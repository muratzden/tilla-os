import type { FounderSignal } from "../founder-signals";
import type { BrandSignal, BrandSignalCategory } from "./types";

const TAG_TO_CATEGORY: Record<string, BrandSignalCategory> = {
  craftsmanship: "quality",
  durability: "quality",
  trust: "trust",
  premium: "positioning",
  audience: "audience",
  transformation: "transformation",
  differentiation: "positioning",
  growth: "growth",
  constraint: "constraint",
};

const TAG_TO_SIGNAL_ID: Record<string, string> = {
  craftsmanship: "handcrafted_quality",
  durability: "durability",
  trust: "long_term_trust",
  premium: "premium_positioning",
  audience: "audience_clarity",
  transformation: "transformation",
  differentiation: "differentiation",
  growth: "growth_ambition",
  constraint: "constraint",
};

export function adaptFounderSignalsToBrandSignals(
  founderSignals: FounderSignal[],
): BrandSignal[] {
  const signalsById = new Map<string, BrandSignal>();

  for (const founderSignal of founderSignals) {
    for (const tag of founderSignal.tags) {
      const id = TAG_TO_SIGNAL_ID[tag];
      const category = TAG_TO_CATEGORY[tag];

      if (!id || !category) {
        continue;
      }

      const existing = signalsById.get(id);

      if (existing) {
        existing.strength = Math.min(
          1,
          existing.strength + founderSignal.importance * 0.2,
        );

        existing.evidence.push(founderSignal.text);
        continue;
      }

      signalsById.set(id, {
        id,
        category,
        strength: Math.min(1, founderSignal.importance),
        evidence: [founderSignal.text],
      });
    }
  }

  return Array.from(signalsById.values());
}
