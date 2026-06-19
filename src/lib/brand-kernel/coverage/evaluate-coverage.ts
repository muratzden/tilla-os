import type { CoverageReport } from "./coverage-types";

type CoverageSignal = {
  category: string;
};

const REQUIRED_AREAS = [
  "identity",
  "audience",
  "belief",
  "transformation",
  "principles",
] as const;

export function evaluateCoverage(
  signals: CoverageSignal[],
): CoverageReport {
  const categories = new Set(
    signals.map((signal) => signal.category),
  );

  const covered = REQUIRED_AREAS.filter((area) =>
    categories.has(area),
  );

  const missing = REQUIRED_AREAS.filter(
    (area) => !categories.has(area),
  );

  const coverageScore = Math.round(
    (covered.length / REQUIRED_AREAS.length) * 100,
  );

  return {
    covered,
    missing,
    coverageScore,
  };
}