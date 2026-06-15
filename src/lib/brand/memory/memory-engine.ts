import { createDecisionMemorySummary } from "./decision-memory";
import { createDistributionMemory } from "./distribution-memory";
import { getBrandMemoryRecords } from "./memory-store";

import type { BrandMemorySummary } from "./memory-types";

export function createBrandMemorySummary(brandId?: string): BrandMemorySummary {
  const records = getBrandMemoryRecords(brandId);

  return {
    decisionMemory: createDecisionMemorySummary(records),

    archetypeMemory: createDistributionMemory(records, "archetype"),

    worldMemory: createDistributionMemory(records, "selectedWorld"),

    recentDecisions: records.slice().reverse().slice(0, 10),
  };
}
