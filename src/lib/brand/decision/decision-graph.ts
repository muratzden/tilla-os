type DecisionGraphInput = {
  dna?: any;
  archetype?: any;
  worldCandidates?: any[];
  world?: any;
  scene?: any;
};

export function buildDecisionGraph(input: DecisionGraphInput) {
  const dna = input.dna;

  const archetypeKey =
    input.archetype?.archetype ||
    input.archetype?.key ||
    input.archetype ||
    "unknown_archetype";

  const worldCandidates =
    input.worldCandidates?.map((candidate) => ({
      key: candidate.key,
      score: candidate.score,
      reason: candidate.reason,
      breakdown: candidate.breakdown,
    })) || [];

  const selectedCandidate = worldCandidates[0] || null;

  const secondPlaceCandidate = worldCandidates[1] || null;

  const selectedWorld =
    selectedCandidate?.key ||
    input.world?.key ||
    input.world?.worldKey ||
    "unknown_world";

  const secondPlace = secondPlaceCandidate || null;

  const decisionMargin =
    selectedCandidate && secondPlaceCandidate
      ? selectedCandidate.score - secondPlaceCandidate.score
      : 0;

  const scene =
    input.scene?.sceneVariant ||
    input.scene?.key ||
    input.scene?.surface ||
    "unknown_scene";

  return {
    dna: {
      type: dna?.type,
      material: dna?.material,
      color: dna?.color,
      size: dna?.size,
      category: dna?.category,
    },
    archetype: archetypeKey,
    worldCandidates,
    selectedWorld,
    selectedScore: selectedCandidate?.score,

    secondPlace: secondPlace?.key,

    secondPlaceScore: secondPlace?.score,

    decisionMargin,

    selectedCandidate,

    scene,
  };
}
