export const POLICY_TRIGGERS = [
  "misleading_claim",
  "unsupported_claim",
  "false_urgency",
  "hide_process",
  "hide_materials",
  "aggressive_scaling",
  "positioning_dilution",
  "price_war",
  "fake_scarcity",
] as const;

export type PolicyTrigger = (typeof POLICY_TRIGGERS)[number];
