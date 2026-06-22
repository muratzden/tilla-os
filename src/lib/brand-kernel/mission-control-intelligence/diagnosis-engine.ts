import type { BrandSignal } from "../signals/types";

import type {
  MissionDiagnosis,
  MissionSeverity,
} from "./mission-control-types";

function calculateSeverity(signalCount: number): MissionSeverity {
  if (signalCount === 0) {
    return "high";
  }

  if (signalCount <= 2) {
    return "medium";
  }

  return "low";
}

export function diagnoseMission(signals: BrandSignal[]): MissionDiagnosis[] {
  const categories = ["identity", "positioning", "trust"] as const;

  return categories.map((category) => {
    const matchingSignals = signals.filter(
      (signal) => signal.category === category,
    );

    return {
      area: category,
      severity: calculateSeverity(matchingSignals.length),
      reason:
        matchingSignals.length > 0
          ? `${category} signals detected but can be strengthened.`
          : `${category} signals are weak or missing.`,
    };
  });
}
