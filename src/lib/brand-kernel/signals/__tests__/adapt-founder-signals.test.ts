import { describe, expect, it } from "vitest";

import { adaptFounderSignalsToBrandSignals } from "../adapt-founder-signals";
import type { FounderSignal } from "../../founder-signals";

describe("Founder Signal Adapter", () => {
  it("adapts founder signals into normalized brand signals", () => {
    const founderSignals: FounderSignal[] = [
      {
        id: "signal_1",
        source: "answer_1",
        text: "We want to build a premium handmade brand.",
        importance: 0.9,
        tags: ["premium", "craftsmanship"],
      },
    ];

    const signals = adaptFounderSignalsToBrandSignals(founderSignals);

    expect(signals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "premium_positioning",
          category: "positioning",
        }),
        expect.objectContaining({
          id: "handcrafted_quality",
          category: "quality",
        }),
      ])
    );
  });
});