import type { BrandConstitution } from "../constitution/constitution-types";
import { scoreWorldCandidate, WorldScoreResult } from "./world-scoring";

type WorldCandidate = WorldScoreResult & {
  baseScore: number;
  constitutionBonus: number;
};

function getConstitutionBonus({
  worldKey,
  archetype,
  constitution,
}: {
  worldKey: string;
  archetype: any;
  constitution?: BrandConstitution;
}): number {
  if (!constitution) return 0;

  const archetypeKey = archetype?.archetype || archetype?.key || archetype;

  if (archetypeKey === "warm_heritage" && worldKey === "private_library") {
    return 5;
  }

  if (archetypeKey === "quiet_power" && worldKey === "collector_office") {
    return 5;
  }

  if (
    constitution.principles.some(
      (principle) => principle.key === "material_truth",
    ) &&
    worldKey === "writer_studio"
  ) {
    return 3;
  }

  if (
    constitution.principles.some(
      (principle) => principle.key === "longevity",
    ) &&
    worldKey === "private_library"
  ) {
    return 3;
  }

  return 0;
}

function buildCandidates({
  keys,
  dna,
  archetype,
  constitution,
}: {
  keys: string[];
  dna: any;
  archetype: any;
  constitution?: BrandConstitution;
}): WorldCandidate[] {
  return keys
    .map((worldKey) => {
      const scored = scoreWorldCandidate({
        worldKey,
        dna,
        archetype,
      });

      const constitutionBonus = getConstitutionBonus({
        worldKey,
        archetype,
        constitution,
      });

      return {
        ...scored,
        baseScore: scored.score,
        constitutionBonus,
        score: scored.score + constitutionBonus,
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function worldExplorer(
  dna: any,
  archetype: any,
  constitution?: BrandConstitution,
): WorldCandidate[] {
  const archetypeKey = archetype?.archetype || archetype?.key || archetype;

  switch (archetypeKey) {
    case "warm_heritage":
      return buildCandidates({
        keys: [
          "private_library",
          "collector_office",
          "writer_studio",
          "quiet_residence",
        ],
        dna,
        archetype,
        constitution,
      });

    case "quiet_power":
      return buildCandidates({
        keys: [
          "collector_office",
          "private_library",
          "writer_studio",
          "quiet_residence",
        ],
        dna,
        archetype,
        constitution,
      });

    case "quiet_luxury":
      return buildCandidates({
        keys: [
          "quiet_residence",
          "collector_office",
          "private_library",
          "writer_studio",
        ],
        dna,
        archetype,
        constitution,
      });

    case "modern_nomad":
      return buildCandidates({
        keys: [
          "writer_studio",
          "quiet_residence",
          "collector_office",
          "private_library",
        ],
        dna,
        archetype,
        constitution,
      });

    default:
      return buildCandidates({
        keys: ["private_library"],
        dna,
        archetype,
        constitution,
      });
  }
}
