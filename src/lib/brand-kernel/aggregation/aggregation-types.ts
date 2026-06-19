import type { BrandSignal } from "../signals/types";
import type { EvidenceReference } from "../evidence/evidence-types";

export type AggregatedSignal = {
  category: BrandSignal["category"];

  signals: BrandSignal[];

  evidence: EvidenceReference[];

  rationale: string[];
};

export type SignalAggregationReport = {
  aggregatedSignals: AggregatedSignal[];
};