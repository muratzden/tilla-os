import { createEvaluation, hasMeaningfulText, type BrandIntelligenceInput, type StrategicEvaluation } from "./types";

export function evaluateChannels(input: BrandIntelligenceInput): StrategicEvaluation {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const risks: string[] = [];
  const missingEvidence: string[] = [];
  const recommendations: string[] = [];
  let score = 6;

  if (input.channels.primary.length > 0 && hasMeaningfulText(input.audience.primary)) {
    score += 18;
    strengths.push("Channel-audience fit can be evaluated.");
  } else {
    weaknesses.push("Channel-audience fit is unclear.");
    missingEvidence.push("channel-audience fit");
  }

  if (input.channels.primary.length > 0 && input.positioning.promise) {
    score += 14;
    strengths.push("Channel-message fit has a usable message anchor.");
  } else {
    weaknesses.push("Channel-message fit is weak.");
    missingEvidence.push("channel-message fit");
  }

  if (input.channels.primary.length <= 1 && input.channels.experiments.length <= 2) {
    score += 12;
    strengths.push("Execution complexity is contained.");
  } else {
    risks.push("Execution complexity is high because too many channels or experiments are active.");
    recommendations.push("Reduce channel scope before increasing execution load.");
  }

  if (input.channels.primary.length > 0 && input.channels.secondary.length === 0) {
    score += 10;
    strengths.push("Dependency risk is limited by focused channel selection.");
  } else if (input.channels.primary.length === 0) {
    missingEvidence.push("primary channel");
  } else {
    risks.push("Multiple channel dependencies may dilute focus.");
  }

  if (input.channels.primary.length > 0 && (!input.audience.primary || !input.positioning.promise)) {
    risks.push("Channel selection may be premature.");
    recommendations.push("Validate audience and message before expanding channels.");
  } else if (input.channels.primary.length > 0) {
    score += 10;
    strengths.push("Channel selection is not obviously premature.");
  }

  return createEvaluation({
    score,
    strengths,
    weaknesses,
    risks,
    missingEvidence,
    recommendations
  });
}
