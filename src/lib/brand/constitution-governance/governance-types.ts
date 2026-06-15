export type ConstitutionGovernanceStatus = "allowed" | "blocked";

export type ConstitutionGovernanceResult = {
  brandId: string;
  status: ConstitutionGovernanceStatus;
  allowed: boolean;
  governanceScore: number;
  violations: string[];
  appliedRules: string[];
};
