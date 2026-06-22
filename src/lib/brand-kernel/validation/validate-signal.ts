import type { AggregatedSignal } from "../aggregation/aggregation-types";

import { MIN_SIGNAL_EVIDENCE_COUNT } from "./signal-validation-constants";

import type { SignalValidationResult } from "./signal-validation-types";

export function validateSignal(
  signal: AggregatedSignal,
): SignalValidationResult {
  const evidenceCount = signal.evidence?.length ?? 0;

  if (evidenceCount < MIN_SIGNAL_EVIDENCE_COUNT) {
    return {
      signal,
      status: "needs_more_evidence",
      reason: "insufficient_evidence",
      rationale: `Signal requires at least ${MIN_SIGNAL_EVIDENCE_COUNT} evidence items.`,
      evidenceCount,
    };
  }

  return {
    signal,
    status: "approved",
    reason: "sufficient_evidence",
    rationale: "Signal passed minimum evidence requirements.",
    evidenceCount,
  };
}
