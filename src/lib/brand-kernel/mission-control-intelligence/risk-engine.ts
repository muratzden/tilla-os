import type { BrandSignal } from "../signals/types";

import type {
  MissionRisk,
  MissionSeverity,
} from "./mission-control-types";

function calculateRiskSeverity(
  signalCount: number,
  averageStrength: number
): MissionSeverity {
  if (signalCount === 0 || averageStrength < 0.35) {
    return "high";
  }

  if (signalCount <= 2 || averageStrength < 0.65) {
    return "medium";
  }

  return "low";
}

function getAverageStrength(signals: BrandSignal[]): number {
  if (signals.length === 0) {
    return 0;
  }

  const total = signals.reduce(
    (sum, signal) => sum + signal.strength,
    0
  );

  return total / signals.length;
}

export function assessMissionRisks(
  signals: BrandSignal[]
): MissionRisk[] {
  const riskAreas = [
    "identity",
    "positioning",
    "trust",
    "quality",
    "growth",
  ] as const;

  return riskAreas.map((area) => {
    const matchingSignals = signals.filter(
      (signal) => signal.category === area
    );

    const averageStrength = getAverageStrength(matchingSignals);

    return {
      area:
        area === "growth"
          ? "offer"
          : area,
      risk: calculateRiskSeverity(
        matchingSignals.length,
        averageStrength
      ),
      description:
        matchingSignals.length > 0
          ? `${area} risk is based on ${matchingSignals.length} detected signal(s) with average strength ${averageStrength.toFixed(2)}.`
          : `${area} risk is high because no reliable signal was detected.`,
    };
  });
}