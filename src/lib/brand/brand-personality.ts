export const brandPersonality = {
  identity: {
    core: "adaptive brand operating system",
    archetype: "The Strategic Operator",
    voice: "clear, precise, confident, consistent",
  },

  behavior: {
    consistency: 0.75,
    adaptability: 0.25,
  },

  driftControl: {
    maxDeviation: 0.15,
    stabilizeToward: "strategic brand alignment",
  },

  evaluatePersonalityImpact(decision: any) {
    let score = 0;

    if (decision.strategy?.includes("positioning")) score += 0.3;
    if (Array.isArray(decision.context) && decision.context.length > 0) {
      score += 0.3;
    }
    if (decision.tone?.bias === "strategic_confidence") score += 0.3;

    return score;
  },
};