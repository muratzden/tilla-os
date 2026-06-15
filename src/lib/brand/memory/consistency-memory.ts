import { BrandMemoryRecord } from "./memory-types";

export function getArchetypeDistribution(decisions: BrandMemoryRecord[]) {
  const counts: Record<string, number> = {};

  for (const decision of decisions) {
    const archetype = decision.archetype;

    if (!archetype) continue;

    counts[archetype] = (counts[archetype] || 0) + 1;
  }

  return counts;
}

export function getWorldDistribution(decisions: BrandMemoryRecord[]) {
  const counts: Record<string, number> = {};

  for (const decision of decisions) {
    const world = decision.selectedWorld;

    if (!world) continue;

    counts[world] = (counts[world] || 0) + 1;
  }

  return counts;
}

export function getDominantValue(distribution: Record<string, number>) {
  const entries = Object.entries(distribution);

  if (entries.length === 0) {
    return null;
  }

  entries.sort((a, b) => b[1] - a[1]);

  return entries[0][0];
}
