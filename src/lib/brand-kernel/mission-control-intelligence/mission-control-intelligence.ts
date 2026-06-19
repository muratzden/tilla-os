import type { BrandSignal } from "../signals/types";

import { diagnoseMission } from "./diagnosis-engine";
import { assessMissionRisks } from "./risk-engine";
import { identifyOpportunities } from "./opportunity-engine";
import { prioritizeMissionAreas } from "./priority-engine";

import type {
  MissionControlIntelligenceReport,
} from "./mission-control-types";

function calculateScore(
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

function determineNextBestAction(
  report: Omit<
    MissionControlIntelligenceReport,
    "nextBestAction"
  >
): string {
  const topPriority =
    report.priorities[0];

  if (!topPriority) {
    return "Collect more brand signals.";
  }

  return `Strengthen ${topPriority.area}.`;
}

export function buildMissionControlIntelligence(
  signals: BrandSignal[]
): MissionControlIntelligenceReport {
  const diagnosis =
    diagnoseMission(signals);

  const risks =
    assessMissionRisks(signals);

  const opportunities =
    identifyOpportunities(signals);

  const priorities =
    prioritizeMissionAreas(risks);

  const score =
    calculateScore(signals);

  return {
    score,
    diagnosis,
    risks,
    opportunities,
    priorities,
    nextBestAction:
      determineNextBestAction({
        score,
        diagnosis,
        risks,
        opportunities,
        priorities,
      }),
  };
}