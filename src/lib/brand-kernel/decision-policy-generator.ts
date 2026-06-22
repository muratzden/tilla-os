import type { BrandConstitution, ConstitutionRule } from "./constitution-generator";
import type { PolicyTrigger } from "./policy-trigger-types";

export interface DecisionPolicy {
  id: string;

  principle: string;

  severity: "low" | "medium" | "high";

  triggers: PolicyTrigger[];
}

const RULE_TRIGGER_PATTERNS: Array<{
  keywords: string[];
  triggers: PolicyTrigger[];
}> = [
  {
    keywords: ["honest", "evidence", "proof", "claim", "supported"],
    triggers: ["misleading_claim", "unsupported_claim"],
  },
  {
    keywords: ["hide", "process", "making"],
    triggers: ["hide_process"],
  },
  {
    keywords: ["material", "materials", "transparency"],
    triggers: ["hide_materials"],
  },
  {
    keywords: ["trust", "credibility"],
    triggers: ["false_urgency", "misleading_claim", "unsupported_claim"],
  },
  {
    keywords: ["scale", "growth", "volume", "expansion"],
    triggers: ["aggressive_scaling"],
  },
  {
    keywords: ["positioning", "diluting", "dilution"],
    triggers: ["positioning_dilution"],
  },
  {
    keywords: ["short-term", "reach", "fast"],
    triggers: ["price_war", "positioning_dilution"],
  },
];

function normalizeText(value: string): string {
  return value.toLowerCase();
}

function compileTriggersFromRule(rule: ConstitutionRule): PolicyTrigger[] {
  const searchableText = normalizeText(
    `${rule.rule} ${rule.rationale} ${rule.principle}`,
  );

  const triggers: PolicyTrigger[] = RULE_TRIGGER_PATTERNS.flatMap((pattern) => {
    const hasMatch = pattern.keywords.some((keyword) =>
      searchableText.includes(keyword),
    );

    return hasMatch ? pattern.triggers : [];
  });

  return Array.from(new Set<PolicyTrigger>(triggers));
}

function compilePolicyFromRule(rule: ConstitutionRule): DecisionPolicy | null {
  const triggers = compileTriggersFromRule(rule);

  if (triggers.length === 0) {
    return null;
  }

  return {
    id: `policy-${rule.id}`,
    principle: rule.principle,
    severity: rule.severity,
    triggers,
  };
}

export function generateDecisionPolicies(
  constitution: BrandConstitution | null,
): DecisionPolicy[] {
  if (!constitution) {
    return [];
  }

  return constitution.rules
    .map(compilePolicyFromRule)
    .filter((policy): policy is DecisionPolicy => Boolean(policy));
}