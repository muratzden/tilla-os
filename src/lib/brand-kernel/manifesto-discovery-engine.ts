import type { BrandSignal } from "./signals/types";
import { scoreManifestoPatterns } from "./manifesto-scoring-engine";

export interface ManifestoPrinciple {
  title: string;
  rationale: string;
  sourceSignals: string[];
  confidence: number;
}

interface ManifestoPattern {
  requiredSignals: string[];
  title: string;
  rationale: string;
}

export const MANIFESTO_PATTERNS: ManifestoPattern[] = [
  {
    requiredSignals: ["handcrafted_quality", "durability"],
    title: "Authenticity over perfection",
    rationale:
      "Long-term value and honest craftsmanship matter more than artificial perfection.",
  },

  {
    requiredSignals: ["premium_positioning", "long_term_trust"],
    title: "Trust before scale",
    rationale: "Credibility should grow before aggressive expansion.",
  },

  {
    requiredSignals: ["growth_ambition", "constraint"],
    title: "Sustainable growth over fast growth",
    rationale: "Growth should not destroy positioning or long-term value.",
  },
];

export function discoverManifesto(
  signals: BrandSignal[],
): ManifestoPrinciple | null {
  const candidates = scoreManifestoPatterns(MANIFESTO_PATTERNS, signals);

  const winner = candidates[0];

  if (!winner) {
    return null;
  }

  return {
    title: winner.title,
    rationale: winner.rationale,
    sourceSignals: winner.matchedSignals,
    confidence: winner.score,
  };
}