export interface GovernanceWorkspaceSignal {
  signal: string;
  severity: "low" | "medium" | "high" | "critical";
  source: string;
  impact: string;
}

export interface GovernanceWorkspace {
  governanceHealth: string;
  alignmentScore: number;
  driftLevel: string;

  dominantPrinciple: string;

  protectedPrinciples: string[];
  forbiddenDirections: string[];

  decisionVetoRisk: string;

  governanceSignals: GovernanceWorkspaceSignal[];

  recommendations: string[];

  conflicts: string[];
}

type GovernanceWorkspaceInput = {
  governance?: {
    governanceHealth?: string;
    decisionVetoRisk?: string;
    governanceSignals?: string[];
    recommendations?: string[];
    corePrincipleConflicts?: string[];
  };
  alignment?: {
    alignmentScore?: number;
    driftLevel?: string;
  };

  constitution?: {
    dominantPrinciple?: string;
    protectedPrinciples?: string[];
    forbiddenDirections?: string[];
  };
};
export function buildGovernanceWorkspace(
  audit?: GovernanceWorkspaceInput,
): GovernanceWorkspace {
  return {
    governanceHealth: audit?.governance?.governanceHealth ?? "unknown",

    alignmentScore: audit?.alignment?.alignmentScore ?? 0,

    driftLevel: audit?.alignment?.driftLevel ?? "unknown",

    dominantPrinciple: audit?.constitution?.dominantPrinciple ?? "unknown",

    protectedPrinciples: audit?.constitution?.protectedPrinciples ?? [],

    forbiddenDirections: audit?.constitution?.forbiddenDirections ?? [],

    decisionVetoRisk: audit?.governance?.decisionVetoRisk ?? "unknown",

    governanceSignals:
      audit?.governance?.governanceSignals?.map((signal) => ({
        signal,
        severity: "medium",
        source: "governance",
        impact: "Review required",
      })) ?? [],

    recommendations: audit?.governance?.recommendations ?? [],

    conflicts: audit?.governance?.corePrincipleConflicts ?? [],
  };
}
