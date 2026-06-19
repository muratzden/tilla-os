import type { BrandSignal } from "../signals/types";

import type {
  MissionOpportunity,
  MissionArea,
} from "./mission-control-types";

const AREA_MAPPING: Record<string, MissionArea> = {
  identity: "identity",
  audience: "audience",
  positioning: "positioning",
  quality: "quality",
  trust: "trust",
  growth: "growth",
};

function calculateOpportunityScore(
  signals: BrandSignal[]
): number {
  if (signals.length === 0) {
    return 0;
  }

  const average =
    signals.reduce(
      (sum, signal) => sum + signal.strength,
      0
    ) / signals.length;

  return Math.round(average * 100);
}

export function identifyOpportunities(
  signals: BrandSignal[]
): MissionOpportunity[] {
  return Object.entries(AREA_MAPPING).map(
    ([signalCategory, area]) => {
      const matchingSignals = signals.filter(
        (signal) =>
          signal.category === signalCategory
      );

      const score =
        calculateOpportunityScore(
          matchingSignals
        );

      return {
        area,
        score,
        reason:
          matchingSignals.length > 0
            ? `${signalCategory} opportunity detected from existing signals.`
            : `${signalCategory} opportunity not yet developed.`,
      };
    }
  );
}