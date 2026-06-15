import type { ForbiddenDirectionKey } from "./forbidden-direction-registry";

export const forbiddenDirectionWeightRegistry: Record<
  ForbiddenDirectionKey,
  number
> = {
  fast_fashion: 10,
  mass_production: 10,
  trend_chasing: 8,
  clickbait: 8,
  shallow_content: 7,
  feature_bloat: 6,
  growth_at_any_cost: 8,
  generic_positioning: 6,
  low_trust_behavior: 10,
  extractive_impact: 9,
};
