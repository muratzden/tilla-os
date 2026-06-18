import { describe, expect, it } from "vitest";

import { runBrandKernel } from "../brand-kernel";
import { auditDecisionAgainstPolicies } from "../decision-audit-engine";
import { generateDecisionCorrection } from "../correction-engine";

describe("Brand Kernel", () => {
  it("builds a complete operating model", async () => {
    const result = await runBrandKernel({
      rawAnswers: [
        "We make handmade products with long-term quality.",
        "Our customers trust us because we focus on durable materials.",
        "We want to grow without becoming a cheap mass product.",
        "Our biggest challenge is explaining why premium quality matters.",
      ],
    });

    expect(result.manifesto?.title).toBe(
      "Authenticity over perfection",
    );

    expect(
      result.missionControl.primaryBottleneck.area,
    ).toBe("transformation");

    expect(result.policies.length).toBeGreaterThan(0);

    const audit = auditDecisionAgainstPolicies(
      "Use fake scarcity and urgent discounts to sell faster.",
      result.policies,
    );

    expect(audit.status).toBe("fail");

    const correction =
      generateDecisionCorrection(
        "Use fake scarcity and urgent discounts to sell faster.",
        audit,
      );

    expect(correction).not.toBeNull();

    expect(
      correction?.correctedDecision,
    ).toContain("trust");
  });
});