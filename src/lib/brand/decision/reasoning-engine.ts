import { getDecisionReasonText } from "../../i18n/decision-reason-text";

type OutputLanguage = "tr" | "en" | "de";
type WorldCandidate = {
  key: string;
  score: number;
  breakdown?: {
    heritageFit?: number;
    craftSignal?: number;
    materialWarmth?: number;
    campaignUsability?: number;
  };
};

export type ReasoningResult = {
  decisionStrength: "weak" | "moderate" | "strong";
  selectedWhy: string[];
  rejectedWhy: {
    key: string;
    reasons: string[];
  }[];
};

export function reasoningEngine(
  worldCandidates: WorldCandidate[],
  outputLanguage: OutputLanguage = "tr",
): ReasoningResult {
  const sorted = [...worldCandidates].sort((a, b) => b.score - a.score);

  const winner = sorted[0];
  const runnerUp = sorted[1];

  if (!winner || !runnerUp) {
    return {
      decisionStrength: "weak",
      selectedWhy: ["not enough alternatives to compare"],
      rejectedWhy: [],
    };
  }

  const margin = winner.score - runnerUp.score;

  return {
    decisionStrength: getDecisionStrength(margin),
    selectedWhy: getSelectedWhy(winner, outputLanguage),
    rejectedWhy: sorted.slice(1).map((candidate) => ({
      key: candidate.key,
      reasons: getRejectedWhy(winner, candidate, outputLanguage),
    })),
  };
}

function getDecisionStrength(margin: number): "weak" | "moderate" | "strong" {
  if (margin <= 3) return "weak";
  if (margin <= 8) return "moderate";
  return "strong";
}

function getSelectedWhy(
  candidate: WorldCandidate,
  outputLanguage: OutputLanguage,
): string[] {
  const breakdown = candidate.breakdown;

  if (!breakdown) {
    return [
      getDecisionReasonText("strongest_overall_world_fit", outputLanguage),
    ];
  }

  const reasons: string[] = [];

  if ((breakdown.heritageFit ?? 0) >= 30) {
    reasons.push(
      getDecisionReasonText("strongest_heritage_environment", outputLanguage),
    );
  }

  if ((breakdown.craftSignal ?? 0) >= 24) {
    reasons.push(getDecisionReasonText("strong_craft_signal", outputLanguage));
  }

  if ((breakdown.materialWarmth ?? 0) >= 18) {
    reasons.push(getDecisionReasonText("high_material_warmth", outputLanguage));
  }

  if ((breakdown.campaignUsability ?? 0) >= 12) {
    reasons.push(
      getDecisionReasonText("strong_campaign_flexibility", outputLanguage),
    );
  }

  return reasons.length
    ? reasons
    : [getDecisionReasonText("strongest_overall_world_fit", outputLanguage)];
}

function getRejectedWhy(
  winner: WorldCandidate,
  rejected: WorldCandidate,
  outputLanguage: OutputLanguage,
): string[] {
  const winnerBreakdown = winner.breakdown;
  const rejectedBreakdown = rejected.breakdown;

  if (!winnerBreakdown || !rejectedBreakdown) {
    return [getDecisionReasonText("lower_overall_score", outputLanguage)];
  }

  const reasons: string[] = [];

  if ((rejectedBreakdown.craftSignal ?? 0) >= 24) {
    reasons.push(
      getDecisionReasonText("ownership_signal_strong", outputLanguage),
    );
  }

  if ((rejectedBreakdown.materialWarmth ?? 0) >= 18) {
    reasons.push(
      getDecisionReasonText("material_warmth_strong", outputLanguage),
    );
  }

  if (
    (rejectedBreakdown.heritageFit ?? 0) < (winnerBreakdown.heritageFit ?? 0)
  ) {
    reasons.push(getDecisionReasonText("heritage_depth_lower", outputLanguage));
  }

  if (
    (rejectedBreakdown.campaignUsability ?? 0) <
    (winnerBreakdown.campaignUsability ?? 0)
  ) {
    reasons.push(
      getDecisionReasonText("campaign_flexibility_lower", outputLanguage),
    );
  }

  return reasons.length
    ? reasons
    : [getDecisionReasonText("lower_overall_score", outputLanguage)];
}
