import type { AggregatedSignal } from "../aggregation/aggregation-types";

export type SignalValidationStatus =
  | "approved"
  | "rejected"
  | "needs_more_evidence";

export type SignalValidationReason =
  | "sufficient_evidence"
  | "insufficient_evidence"
  | "low_confidence"
  | "low_founder_certainty"
  | "unsupported_signal"
  | "contradictory_signal";

export interface SignalValidationResult {
  signal: AggregatedSignal;

  status: SignalValidationStatus;

  reason: SignalValidationReason;

  rationale: string;

  evidenceCount: number;
}

export interface SignalValidationReport {
  approved: SignalValidationResult[];
  rejected: SignalValidationResult[];
  needsMoreEvidence: SignalValidationResult[];
}
