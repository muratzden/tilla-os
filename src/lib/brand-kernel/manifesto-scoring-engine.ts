import { FounderSignal } from "./founder-signals";

export interface ManifestoCandidate {
  title: string;

  rationale: string;

  matchedSignals: string[];

  score: number;
}

export interface ManifestoPattern {
  title: string;

  rationale: string;

  requiredTags: string[];
}

export function scoreManifestoPatterns(
  patterns: ManifestoPattern[],
  signals: FounderSignal[],
): ManifestoCandidate[] {
  const availableTags = Array.from(
    new Set(
      signals.flatMap((signal) => signal.tags),
    ),
  );

  return patterns
    .map((pattern) => {
      const matchedSignals =
        pattern.requiredTags.filter((tag) =>
          availableTags.includes(tag),
        );

      const score = Math.round(
        (matchedSignals.length /
          pattern.requiredTags.length) *
          100,
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