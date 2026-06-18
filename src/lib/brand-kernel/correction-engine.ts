import { DecisionAuditResult } from "./decision-audit-engine";

export interface DecisionCorrection {
  originalDecision: string;

  correctedDecision: string;

  explanation: string;
}

const CORRECTION_LIBRARY: Record<string, string> = {
  trust_protection:
    "Replace artificial urgency with trust-building proof, customer evidence, and transparency.",

  transparency:
    "Increase visibility into materials, process, and product evidence instead of hiding them.",
};

export function generateDecisionCorrection(
  originalDecision: string,
  audit: DecisionAuditResult,
): DecisionCorrection | null {
  if (audit.status === "pass") {
    return null;
  }

  const primaryConflict = audit.matchedPolicies[0];

  if (!primaryConflict) {
    return null;
  }

  return {
    originalDecision,
    correctedDecision:
      CORRECTION_LIBRARY[primaryConflict.id] ??
      "Redesign the decision to align with the brand constitution.",
    explanation: audit.recommendation,
  };
}