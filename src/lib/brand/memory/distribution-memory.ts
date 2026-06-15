import type { BrandMemoryRecord, DistributionItem } from "./memory-types";

export function createDistributionMemory(
  records: BrandMemoryRecord[],
  field: "archetype" | "selectedWorld",
): DistributionItem[] {
  const counts = new Map<string, number>();

  for (const record of records) {
    const key = record[field];

    if (!key) {
      continue;
    }

    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const total = Array.from(counts.values()).reduce(
    (sum, count) => sum + count,
    0,
  );

  if (total === 0) {
    return [];
  }

  return Array.from(counts.entries())
    .map(([key, count]) => ({
      key,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}
