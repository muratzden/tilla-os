import { describe, expect, it } from "vitest";

import { runBrandKernel } from "../brand-kernel";

describe("Brand Kernel", () => {
  it("routes founder answers through aggregation, validation, and manifesto gate", async () => {
    const result = await runBrandKernel({
      rawAnswers: [
        "We make handmade products with long-term quality.",
        "Our customers trust us because we focus on durable materials.",
        "We want to grow without becoming a cheap mass product.",
        "Our biggest challenge is explaining why premium quality matters.",
      ],
    });

    expect(result.signals.length).toBeGreaterThan(0);
    expect(result.brandSignals.length).toBeGreaterThan(0);

    expect(result.aggregation.aggregatedSignals.length).toBeGreaterThan(0);

    expect(
      result.validation.approved.length +
        result.validation.needsMoreEvidence.length +
        result.validation.rejected.length,
    ).toBe(result.aggregation.aggregatedSignals.length);

    expect(result.manifestoGate.readiness.status).toBe(
      "NEED_MORE_INFORMATION",
    );

    expect(result.manifesto).toBeNull();
    expect(result.constitution).toBeNull();
    expect(result.policies).toEqual([]);

    expect(result.missionControl.primaryBottleneck.area).toBeDefined();
  });
});