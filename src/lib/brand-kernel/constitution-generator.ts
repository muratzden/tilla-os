import { ManifestoPrinciple } from "./manifesto-discovery-engine";

export interface ConstitutionRule {
  id: string;

  principle: string;

  rule: string;

  rationale: string;

  severity: "low" | "medium" | "high";
}

export interface BrandConstitution {
  sourceManifesto: string;

  rules: ConstitutionRule[];
}

const CONSTITUTION_RULES_BY_MANIFESTO: Record<
  string,
  Omit<ConstitutionRule, "id" | "principle">[]
> = {
  "Authenticity over perfection": [
    {
      rule: "Prefer honest evidence over polished claims.",
      rationale:
        "The brand should prove value through real signals instead of artificial perfection.",
      severity: "high",
    },
    {
      rule: "Do not hide the making process.",
      rationale:
        "Visible process strengthens trust when authenticity is the dominant principle.",
      severity: "medium",
    },
    {
      rule: "Avoid decisions that weaken long-term trust.",
      rationale:
        "Short-term polish should not damage credibility or perceived honesty.",
      severity: "high",
    },
  ],

  "Trust before scale": [
    {
      rule: "Do not scale faster than credibility allows.",
      rationale:
        "Growth without proof weakens the brand's ability to sustain trust.",
      severity: "high",
    },
    {
      rule: "Prioritize proof points before aggressive promotion.",
      rationale:
        "The brand must earn belief before asking for broader attention.",
      severity: "high",
    },
    {
      rule: "Avoid claims that cannot be supported with evidence.",
      rationale:
        "Unsupported claims create trust debt.",
      severity: "medium",
    },
  ],

  "Sustainable growth over fast growth": [
    {
      rule: "Reject growth moves that damage positioning.",
      rationale:
        "Growth should strengthen the brand model instead of diluting it.",
      severity: "high",
    },
    {
      rule: "Prefer controlled expansion over uncontrolled volume.",
      rationale:
        "Fast growth can create operational and identity drift.",
      severity: "medium",
    },
    {
      rule: "Do not trade long-term value for short-term reach.",
      rationale:
        "Reach is useful only when it reinforces the operating model.",
      severity: "high",
    },
  ],
};

export function generateConstitution(
  manifesto: ManifestoPrinciple | null,
): BrandConstitution | null {
  if (!manifesto) {
    return null;
  }

  const rules = CONSTITUTION_RULES_BY_MANIFESTO[manifesto.title] ?? [];

  return {
    sourceManifesto: manifesto.title,
    rules: rules.map((rule, index) => ({
      id: `constitution-rule-${index + 1}`,
      principle: manifesto.title,
      ...rule,
    })),
  };
}