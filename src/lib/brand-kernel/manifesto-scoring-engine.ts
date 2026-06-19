import type { BrandSignal } from "./signals/types";

export interface ManifestoCandidate {
  title: string;

  rationale: string;

  matchedSignals: string[];

  score: number;
}

export interface ManifestoPattern {
  title: string;

  rationale: string;

  requiredSignals: string[];
}

export function scoreManifestoPatterns(
  patterns: ManifestoPattern[],
  signals: BrandSignal[],
): ManifestoCandidate[] {
  const availableSignalIds = new Set(signals.map((signal) => signal.id));
  const availableCategories = new Set(signals.map((signal) => signal.category));

  return patterns
    .map((pattern) => {
      const matchedSignals = pattern.requiredSignals.filter(
        (requiredSignal) =>
          availableSignalIds.has(requiredSignal) ||
          availableCategories.has(requiredSignal as BrandSignal["category"]),
      );

      const score = Math.round(
        (matchedSignals.length / pattern.requiredSignals.length) * 100,
      );

      return {
        title: pattern.title,
        rationale: pattern.rationale,
        matchedSignals,
        score,
      };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score);
}
