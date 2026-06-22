import {
  createEvaluation,
  hasMeaningfulText,
  hasGenericAudienceLanguage,
  hasSharpSegment,
  hasSpecificPhrase,
  type BrandIntelligenceInput,
  type StrategicEvaluation,
} from "./types";

export function evaluateAudience(
  input: BrandIntelligenceInput,
): StrategicEvaluation {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const risks: string[] = [];
  const missingEvidence: string[] = [];
  const recommendations: string[] = [];
  let score = 6;

  if (hasSpecificPhrase(input.audience.primary)) {
    score += 18;
    strengths.push(
      "Audience specificity is high enough to guide offer and message choices.",
    );
  } else {
    weaknesses.push("Audience definition is too broad.");
    missingEvidence.push("specific primary audience");
    recommendations.push(
      "Define the audience around a concrete situation, role, need, or trigger.",
    );
  }

  if (hasGenericAudienceLanguage(input.audience.primary)) {
    score -= 16;
    weaknesses.push("Audience language is generic.");
    risks.push(
      "A generic audience can make positioning, trust, and channel choices look stronger than they are.",
    );
    recommendations.push(
      "Replace generic audience language with a sharper segment and situation.",
    );
  }

  if (input.audience.needs.length >= 2 || input.audience.barriers.length >= 2) {
    score += 18;
    strengths.push("Problem urgency is visible through needs or barriers.");
  } else {
    weaknesses.push("Problem urgency is not yet proven.");
    missingEvidence.push("urgent needs or painful barriers");
    recommendations.push(
      "Capture the strongest pain, delay, fear, cost, or urgency behind the audience problem.",
    );
  }

  if (hasMeaningfulText(input.audience.desiredOutcome)) {
    score += 18;
    strengths.push("Desired outcome is clear.");
  } else {
    weaknesses.push("Desired outcome is unclear.");
    missingEvidence.push("desired outcome");
    recommendations.push(
      "State the outcome the audience wants in plain language.",
    );
  }

  if (
    hasMeaningfulText(input.audience.primary) &&
    hasMeaningfulText(input.offer.core)
  ) {
    score += 10;
    strengths.push("Buyer/user context can be compared with the offer.");
  } else {
    risks.push(
      "Buyer/user clarity is weak because audience and offer are not both explicit.",
    );
    missingEvidence.push("buyer or user relationship to the offer");
  }

  if (hasSharpSegment(input.audience.primary)) {
    score += 16;
    strengths.push("Segment sharpness is strong.");
  } else {
    weaknesses.push("Segment sharpness is weak.");
    recommendations.push(
      "Make the segment sharper by naming who it is for and why now.",
    );
  }

  return createEvaluation({
    score,
    strengths,
    weaknesses,
    risks,
    missingEvidence,
    recommendations,
  });
}
