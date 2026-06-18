import { FounderSignal } from "./founder-signals";
import {
  scoreManifestoPatterns,
} from "./manifesto-scoring-engine";

export interface ManifestoPrinciple {
  title: string;
  rationale: string;
  sourceSignals: string[];
  confidence: number;
}

interface ManifestoPattern {
  requiredTags: string[];
  title: string;
  rationale: string;
}

export const MANIFESTO_PATTERNS: ManifestoPattern[] = [
  {
    requiredTags: ["craftsmanship", "durability"],
    title: "Authenticity over perfection",
    rationale:
      "Long-term value and honest craftsmanship matter more than artificial perfection.",
  },

  {
    requiredTags: ["premium", "trust"],
    title: "Trust before scale",
    rationale:
      "Credibility should grow before aggressive expansion.",
  },

  {
    requiredTags: ["growth", "constraint"],
    title: "Sustainable growth over fast growth",
    rationale:
      "Growth should not destroy positioning or long-term value.",
  },
];

function hasRequiredTags(
  availableTags: string[],
  requiredTags: string[],
): boolean {
  return requiredTags.every((tag) =>
    availableTags.includes(tag),
  );
}

export function discoverManifesto(
  signals: FounderSignal[],
): ManifestoPrinciple | null {
  const candidates =
    scoreManifestoPatterns(
      MANIFESTO_PATTERNS,
      signals,
    );

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