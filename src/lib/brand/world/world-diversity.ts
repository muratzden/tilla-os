// src/lib/brand/world/world-diversity.ts

import {
  createProductSignature,
  createDeterministicSeed,
} from "../identity/signature-engine";

export type WeightedWorldCandidate = {
  worldKey: string;
  weight: number;
};

const worldDiversityMap: Record<string, WeightedWorldCandidate[]> = {
  warm_heritage: [
    { worldKey: "private_library", weight: 40 },
    { worldKey: "collector_office", weight: 25 },
    { worldKey: "writer_studio", weight: 20 },
    { worldKey: "quiet_residence", weight: 15 },
  ],

  quiet_power: [
    { worldKey: "controlled_office", weight: 45 },
    { worldKey: "collector_office", weight: 30 },
    { worldKey: "quiet_residence", weight: 25 },
  ],

  modern_nomad: [
    { worldKey: "modern_travel", weight: 45 },
    { worldKey: "airport_lounge", weight: 35 },
    { worldKey: "writer_studio", weight: 20 },
  ],
};

export function selectWorldKeyByDiversity(input: {
  dna: any;
  archetype?: string;
  channel?: string;
  seed?: number;
}): string {
  const archetype = input.archetype || "default";

  const candidates = getContextualCandidates(input) ||
    worldDiversityMap[archetype] || [
      { worldKey: "minimal_gallery", weight: 60 },
      { worldKey: "quiet_residence", weight: 40 },
    ];

  const signature = createProductSignature(input.dna || {});
  const stableSeed =
    typeof input.seed === "number"
      ? input.seed
      : createDeterministicSeed(signature, input.channel);

  return pickWeightedDeterministic(candidates, stableSeed);
}

function getContextualCandidates(input: {
  dna: any;
  archetype?: string;
}): WeightedWorldCandidate[] | null {
  if (
    input.dna?.material === "frisco" &&
    input.dna?.color === "camel" &&
    input.archetype === "warm_heritage"
  ) {
    return [
      { worldKey: "private_library", weight: 40 },
      { worldKey: "collector_office", weight: 25 },
      { worldKey: "writer_studio", weight: 20 },
      { worldKey: "quiet_residence", weight: 15 },
    ];
  }

  return null;
}

function pickWeightedDeterministic(
  candidates: WeightedWorldCandidate[],
  seed: number,
): string {
  const totalWeight = candidates.reduce((sum, item) => sum + item.weight, 0);

  if (!candidates.length || totalWeight <= 0) {
    throw new Error("Cannot select world from empty or invalid weighted list");
  }

  const point = seed % totalWeight;

  let cursor = 0;

  for (const candidate of candidates) {
    cursor += candidate.weight;

    if (point < cursor) {
      return candidate.worldKey;
    }
  }

  return candidates[candidates.length - 1].worldKey;
}
