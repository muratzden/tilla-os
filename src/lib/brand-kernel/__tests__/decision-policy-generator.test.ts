import { describe, expect, it } from "vitest";

import { generateDecisionPolicies } from "../decision-policy-generator";
import type { BrandConstitution } from "../constitution-generator";

describe("Decision Policy Generator", () => {
  it("compiles decision policies from constitution rules", () => {
    const constitution: BrandConstitution = {
      sourceManifesto: "Test manifesto",
      rules: [
        {
          id: "rule-1",
          principle: "Evidence before claims",
          rule: "Avoid claims that cannot be supported with evidence.",
          rationale: "Unsupported claims create trust debt.",
          severity: "high",
        },
        {
          id: "rule-2",
          principle: "Material honesty",
          rule: "Do not hide materials or the making process.",
          rationale: "Visible process strengthens trust.",
          severity: "medium",
        },
      ],
    };

    const policies = generateDecisionPolicies(constitution);

    expect(policies).toEqual([
      {
        id: "policy-rule-1",
        principle: "Evidence before claims",
        severity: "high",
        triggers: ["misleading_claim", "unsupported_claim", "false_urgency"],
      },
      {
        id: "policy-rule-2",
        principle: "Material honesty",
        severity: "medium",
        triggers: [
          "misleading_claim",
          "unsupported_claim",
          "hide_process",
          "hide_materials",
          "false_urgency",
        ],
      },
    ]);
  });

  it("returns an empty policy list when constitution is missing", () => {
    expect(generateDecisionPolicies(null)).toEqual([]);
  });

  it("skips constitution rules that cannot be compiled into triggers", () => {
    const constitution: BrandConstitution = {
      sourceManifesto: "Test manifesto",
      rules: [
        {
          id: "rule-1",
          principle: "Undefined principle",
          rule: "Maintain internal discipline.",
          rationale: "This rule has no compiler trigger yet.",
          severity: "low",
        },
      ],
    };

    expect(generateDecisionPolicies(constitution)).toEqual([]);
  });
});
