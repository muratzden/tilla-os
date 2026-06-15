export type WorldScoreBreakdown = {
  heritageFit: number;
  craftSignal: number;
  materialWarmth: number;
  campaignUsability: number;
};

export type WorldScoreResult = {
  key: string;
  score: number;
  reason: string;
  breakdown: WorldScoreBreakdown;
};

export function scoreWorldCandidate({
  worldKey,
  dna,
  archetype,
}: {
  worldKey: string;
  dna: any;
  archetype: any;
}): WorldScoreResult {
  const archetypeKey = archetype?.archetype || archetype?.key || archetype;

  let breakdown: WorldScoreBreakdown;

  if (archetypeKey === "warm_heritage") {
    breakdown = {
      heritageFit: worldKey === "private_library" ? 35 : 24,

      craftSignal:
        worldKey === "collector_office"
          ? 28
          : worldKey === "writer_studio"
            ? 24
            : 20,

      materialWarmth:
        dna?.color === "camel" || dna?.color === "brown" ? 22 : 14,

      campaignUsability: worldKey === "quiet_residence" ? 12 : 15,
    };
  } else if (archetypeKey === "quiet_power") {
    breakdown = {
      heritageFit:
        worldKey === "collector_office"
          ? 22
          : worldKey === "private_library"
            ? 12
            : 16,

      craftSignal:
        worldKey === "collector_office"
          ? 26
          : worldKey === "writer_studio"
            ? 18
            : 14,

      materialWarmth:
        worldKey === "collector_office"
          ? 18
          : worldKey === "private_library"
            ? 10
            : 14,

      campaignUsability:
        worldKey === "collector_office"
          ? 28
          : worldKey === "quiet_residence"
            ? 18
            : 16,
    };
  } else if (archetypeKey === "quiet_luxury") {
    breakdown = {
      heritageFit:
        worldKey === "quiet_residence"
          ? 24
          : worldKey === "private_library"
            ? 18
            : worldKey === "collector_office"
              ? 16
              : 10,

      craftSignal:
        worldKey === "collector_office"
          ? 20
          : worldKey === "private_library"
            ? 16
            : worldKey === "writer_studio"
              ? 12
              : 14,

      materialWarmth:
        dna?.material === "tiana"
          ? 26
          : dna?.color === "black"
            ? 24
            : dna?.color === "brown"
              ? 18
              : 16,

      campaignUsability:
        worldKey === "quiet_residence"
          ? 28
          : worldKey === "collector_office"
            ? 24
            : worldKey === "private_library"
              ? 18
              : 14,
    };
  } else if (archetypeKey === "modern_nomad") {
    breakdown = {
      heritageFit:
        worldKey === "writer_studio"
          ? 18
          : worldKey === "quiet_residence"
            ? 14
            : worldKey === "collector_office"
              ? 10
              : 8,

      craftSignal:
        worldKey === "writer_studio"
          ? 26
          : worldKey === "private_library"
            ? 18
            : worldKey === "quiet_residence"
              ? 16
              : 12,

      materialWarmth:
        dna?.material === "crazy"
          ? 26
          : dna?.color === "camel"
            ? 22
            : dna?.color === "brown"
              ? 20
              : 14,

      campaignUsability:
        worldKey === "writer_studio"
          ? 28
          : worldKey === "quiet_residence"
            ? 24
            : worldKey === "collector_office"
              ? 16
              : 12,
    };
  } else {
    breakdown = {
      heritageFit: 15,
      craftSignal: 15,
      materialWarmth: 15,
      campaignUsability: 15,
    };
  }

  const score =
    breakdown.heritageFit +
    breakdown.craftSignal +
    breakdown.materialWarmth +
    breakdown.campaignUsability;

  return {
    key: worldKey,
    score,
    reason: "world score",
    breakdown,
  };
}
