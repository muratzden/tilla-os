import type { BrandMemoryRecord, DecisionMemorySummary } from "./memory-types";

export function createDecisionMemorySummary(
  records: BrandMemoryRecord[],
): DecisionMemorySummary {
  const totalDecisions = records.length;

  const confidenceValues = records
    .map((record) => record.confidence)
    .filter((value): value is number => typeof value === "number");

  const averageConfidence =
    confidenceValues.length > 0
      ? Math.round(
          confidenceValues.reduce((sum, value) => sum + value, 0) /
            confidenceValues.length,
        )
      : null;

  return {
    totalDecisions,
    averageConfidence,
  };
}
