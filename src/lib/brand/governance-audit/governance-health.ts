import type {
  AuditSeverity,
  DecisionVetoRisk,
  GovernanceHealth,
} from "./governance-audit-types";

export function calculateGovernanceHealth(
  violationCount: number,
): GovernanceHealth {
  if (violationCount === 0) {
    return "healthy";
  }

  if (violationCount <= 2) {
    return "warning";
  }

  return "critical";
}

export function calculateAuditSeverity(violationCount: number): AuditSeverity {
  if (violationCount === 0) {
    return "none";
  }

  if (violationCount === 1) {
    return "low";
  }

  if (violationCount === 2) {
    return "medium";
  }

  return "high";
}

export function calculateDecisionVetoRisk(
  violationCount: number,
): DecisionVetoRisk {
  if (violationCount === 0) {
    return "low";
  }

  if (violationCount <= 2) {
    return "medium";
  }

  return "high";
}

export function calculateGovernanceAlignment(violationCount: number): number {
  return Math.max(0, 100 - violationCount * 25);
}
