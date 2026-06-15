export type AdvisorWarning = {
  severity: "low" | "medium" | "high";
  message: string;
};

export type AdvisorOpportunity = {
  priority: "low" | "medium" | "high";
  message: string;
};

export type AdvisorAction = {
  priority: "low" | "medium" | "high";
  action: string;
};

export type GovernanceSignal = {
  type:
    | "archetype_drift"
    | "world_drift"
    | "consistency_decline"
    | "constitution_risk";

  level: "low" | "medium" | "high";
};

export type AdvisorV2Result = {
  warnings: AdvisorWarning[];
  opportunities: AdvisorOpportunity[];
  actions: AdvisorAction[];
  governanceSignals: GovernanceSignal[];
};
