const FORBIDDEN_DIRECTION_RECOMMENDATIONS: Record<string, string> = {
  fast_fashion:
    "Remove trend-driven language and reinforce craft, permanence and restraint.",

  mass_production:
    "Remove mass-production signals and emphasize human craft, small-batch making and intentional variation.",

  trend_chasing:
    "Avoid viral or hype-based positioning and return to timeless brand language.",
};

const CORE_PRINCIPLE_RECOMMENDATIONS: Record<string, string> = {
  human_craft:
    "Reframe the content around human craft, handwork and maker presence.",

  material_truth:
    "Clarify the material truth and avoid synthetic or imitation material signals.",

  individuality:
    "Emphasize individuality, controlled variation and non-identical character.",

  longevity:
    "Strengthen durability, repairability, patina and long-term ownership language.",
};

export function buildGovernanceRecommendations(params: {
  forbiddenDirectionExposure: string[];
  corePrincipleConflicts: string[];
}): string[] {
  const recommendations = [
    ...params.forbiddenDirectionExposure.map(
      (direction) => FORBIDDEN_DIRECTION_RECOMMENDATIONS[direction],
    ),
    ...params.corePrincipleConflicts.map(
      (principle) => CORE_PRINCIPLE_RECOMMENDATIONS[principle],
    ),
  ].filter(Boolean);

  return [...new Set(recommendations)];
}
