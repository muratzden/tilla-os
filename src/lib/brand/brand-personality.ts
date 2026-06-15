export const brandPersonality = {
  identity: {
    core: "quiet luxury artisan system",
    archetype: "The Craft Guardian",
    voice: "calm, precise, confident, minimal",
  },

  behavior: {
    consistency: 0.8, // how stable decisions should be
    adaptability: 0.2, // how much it can change
  },

  driftControl: {
    maxDeviation: 0.15,
    stabilizeToward: "executive artisan luxury",
  },

  evaluatePersonalityImpact(decision: any) {
    let score = 0;

    if (decision.strategy.includes("executive")) score += 0.4;
    if (decision.context?.includes("office environment")) score += 0.2;
    if (decision.tone?.bias === "controlled_confidence") score += 0.3;

    return score;
  },
};
