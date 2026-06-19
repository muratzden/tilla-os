import type { ExtractedSignal } from "../extraction/extraction-types";

import type {
  AggregatedSignal,
  SignalAggregationReport,
} from "./aggregation-types";

export function aggregateSignals(
  extractedSignals: ExtractedSignal[],
): SignalAggregationReport {
  const grouped = new Map<AggregatedSignal["category"], AggregatedSignal>();

  for (const extractedSignal of extractedSignals) {
    const category = extractedSignal.signal.category;

    const existing = grouped.get(category);

    if (existing) {
      existing.signals.push(extractedSignal.signal);
      existing.evidence.push(...extractedSignal.evidence);
      existing.rationale.push(extractedSignal.rationale);
      continue;
    }

    grouped.set(category, {
      category,
      signals: [extractedSignal.signal],
      evidence: [...extractedSignal.evidence],
      rationale: [extractedSignal.rationale],
    });
  }

  return {
    aggregatedSignals: Array.from(grouped.values()),
  };
}