export type DecisionConfidenceLevel = "low" | "medium" | "high";

export type DecisionRisk = "low" | "moderate" | "high";

export type DecisionConfidence = {
  confidence: number;
  confidenceLevel: DecisionConfidenceLevel;
  decisionRisk: DecisionRisk;
  stability: number;
  signalCoverage: number;
  confidenceReasons: string[];
  missingSignals: string[];
};

export function decisionConfidence({
  worldCandidates,
  decisionIntelligence,
  dna,
}: {
  worldCandidates: any[];
  decisionIntelligence: any;
  dna: any;
}): DecisionConfidence {
  const expectedSignals = ["category", "material", "color"];

  const availableSignals = expectedSignals.filter((key) => dna?.[key]).length;

  const signalCoverage = Math.round(
    (availableSignals / expectedSignals.length) * 100,
  );

  const missingSignals = expectedSignals.filter((key) => !dna?.[key]);

  const winner = worldCandidates?.[0]?.score ?? 0;
  const runnerUp = worldCandidates?.[1]?.score ?? 0;
  const third = worldCandidates?.[2]?.score ?? 0;

  const margin = winner - runnerUp;

  let separationScore = 40;

  if (margin >= 15) {
    separationScore = 100;
  } else if (margin >= 10) {
    separationScore = 80;
  } else if (margin >= 5) {
    separationScore = 60;
  }

  let clarityScore = 50;

  switch (decisionIntelligence?.decisionStrength) {
    case "strong":
      clarityScore = 100;
      break;
    case "medium":
    case "moderate":
      clarityScore = 70;
      break;
    case "weak":
      clarityScore = 40;
      break;
  }
  const stability = Math.max(0, Math.min(100, (winner - third) * 5));

  const confidence = Math.round(
    separationScore * 0.25 +
      clarityScore * 0.25 +
      signalCoverage * 0.3 +
      stability * 0.2,
  );

  let confidenceLevel: DecisionConfidenceLevel = "low";

  if (confidence >= 80) {
    confidenceLevel = "high";
  } else if (confidence >= 60) {
    confidenceLevel = "medium";
  }

  let decisionRisk: DecisionRisk = "high";

  if (confidence >= 80) {
    decisionRisk = "low";
  } else if (confidence >= 60) {
    decisionRisk = "moderate";
  }

  const confidenceReasons: string[] = [];

  if (margin >= 10) {
    confidenceReasons.push("strong world separation");
  } else if (margin >= 5) {
    confidenceReasons.push("moderate world separation");
  } else {
    confidenceReasons.push("top worlds are very close");
  }

  if (decisionIntelligence?.decisionStrength === "strong") {
    confidenceReasons.push("clear archetype alignment");
  } else if (decisionIntelligence?.decisionStrength === "weak") {
    confidenceReasons.push("weak decision strength");
  }

  if (signalCoverage >= 80) {
    confidenceReasons.push("high signal coverage");
  } else {
    confidenceReasons.push("incomplete input signals");
  }

  return {
    confidence,
    confidenceLevel,
    decisionRisk,
    stability,
    signalCoverage,
    confidenceReasons,
    missingSignals,
  };
}
