import type { AggregatedSignal } from "../aggregation/aggregation-types";

import { validateSignal } from "./validate-signal";

import type {
  SignalValidationReport,
} from "./signal-validation-types";

export function validateSignals(
  signals: AggregatedSignal[],
): SignalValidationReport {
  const results = signals.map((signal) => validateSignal(signal));

  return {
    approved: results.filter((result) => result.status === "approved"),
    rejected: results.filter((result) => result.status === "rejected"),
    needsMoreEvidence: results.filter(
      (result) => result.status === "needs_more_evidence",
    ),
  };
}