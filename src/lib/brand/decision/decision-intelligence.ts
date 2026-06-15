import { getDecisionReasonText } from "../../i18n/decision-reason-text";

type DecisionStrength = "strong" | "moderate" | "weak";
type OutputLanguage = "tr" | "en" | "de";

export function getDecisionStrength(margin: number): DecisionStrength {
  if (margin >= 10) return "strong";
  if (margin >= 5) return "moderate";
  return "weak";
}

export function buildDecisionIntelligence({
  selectedWorld,
  selectedScore,
  secondPlace,
  secondPlaceScore,
  outputLanguage = "tr",
}: {
  selectedWorld: string;
  selectedScore: number;
  secondPlace?: string;
  secondPlaceScore?: number;
  outputLanguage?: OutputLanguage;
}) {
  const margin = selectedScore - (secondPlaceScore ?? 0);

  const selectedWhy: string[] = [];

  if (selectedScore >= 90) {
    selectedWhy.push(
      getDecisionReasonText("strongest_overall_world_fit", outputLanguage),
    );
  }

  if (selectedWorld === "private_library") {
    selectedWhy.push(
      getDecisionReasonText("strongest_heritage_environment", outputLanguage),
    );

    selectedWhy.push(
      getDecisionReasonText("highest_memory_depth", outputLanguage),
    );

    selectedWhy.push(
      getDecisionReasonText("strong_campaign_flexibility", outputLanguage),
    );
  }

  if (selectedWorld === "collector_office") {
    selectedWhy.push(
      getDecisionReasonText("strong_ownership_signals", outputLanguage),
    );

    selectedWhy.push(
      getDecisionReasonText("executive_positioning", outputLanguage),
    );
  }

  let decisionStrength = getDecisionStrength(margin);

  if (decisionStrength === "weak" && selectedWhy.length >= 3) {
    decisionStrength = "moderate";
  }

  const rejectedWhy: {
    key: string;
    reasons: string[];
  }[] = [];

  if (secondPlace) {
    const reasons: string[] = [];

    if (secondPlace === "collector_office") {
      reasons.push(
        getDecisionReasonText("ownership_signal_strong", outputLanguage),
      );

      reasons.push(
        getDecisionReasonText("heritage_depth_lower", outputLanguage),
      );
    }

    if (secondPlace === "writer_studio") {
      reasons.push(
        getDecisionReasonText("creative_signal_strong", outputLanguage),
      );

      reasons.push(
        getDecisionReasonText("campaign_flexibility_lower", outputLanguage),
      );
    }

    rejectedWhy.push({
      key: secondPlace,
      reasons,
    });
  }

  return {
    decisionStrength,
    selectedWhy,
    rejectedWhy,
  };
}
