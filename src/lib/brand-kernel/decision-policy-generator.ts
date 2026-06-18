import { BrandConstitution } from "./constitution-generator";

export interface DecisionPolicy {
  id: string;

  principle: string;

  severity: "low" | "medium" | "high";

  triggers: string[];
}

const POLICY_LIBRARY: Record<string, DecisionPolicy[]> = {
  "Authenticity over perfection": [
    {
      id: "trust_protection",
      principle: "Authenticity over perfection",
      severity: "high",
      triggers: ["fake_scarcity", "misleading_claim", "false_urgency"],
    },
    {
      id: "transparency",
      principle: "Authenticity over perfection",
      severity: "medium",
      triggers: ["hide_process", "hide_materials"],
    },
  ],

  "Trust before scale": [
    {
      id: "trust_before_growth",
      principle: "Trust before scale",
      severity: "high",
      triggers: ["aggressive_scaling", "unsupported_claim"],
    },
  ],

  "Sustainable growth over fast growth": [
    {
      id: "growth_protection",
      principle: "Sustainable growth over fast growth",
      severity: "high",
      triggers: ["positioning_dilution", "price_war"],
    },
  ],
};

export function generateDecisionPolicies(
  constitution: BrandConstitution | null,
): DecisionPolicy[] {
  if (!constitution) {
    return [];
  }

  return POLICY_LIBRARY[constitution.sourceManifesto] ?? [];
}