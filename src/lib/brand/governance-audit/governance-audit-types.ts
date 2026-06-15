export type GovernanceHealth = "healthy" | "warning" | "critical";

export type AuditSeverity = "none" | "low" | "medium" | "high";

export type DecisionVetoRisk = "low" | "medium" | "high";

export interface GovernanceAuditInput {
  brandId: string;
  channel: string;
  content: string;
}

export interface GovernanceAuditResult {
  brandId: string;
  channel: string;

  constitutionAlignment: number;
  governanceAlignment: number;

  governanceHealth: GovernanceHealth;
  severity: AuditSeverity;
  decisionVetoRisk: DecisionVetoRisk;

  violations: string[];
  forbiddenDirectionExposure: string[];
  corePrincipleConflicts: string[];

  recommendations: string[];
}
