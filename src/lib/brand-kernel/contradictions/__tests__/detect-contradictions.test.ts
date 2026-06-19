import { describe, expect, it } from "vitest";

import { detectContradictions } from "../detect-contradictions";

describe("Contradiction Engine", () => {
  it("detects pricing conflict", () => {
    const tensions = detectContradictions([
      {
        id: "premium_positioning",
        category: "positioning",
        strength: 0.9,
        evidence: [],
      },

      {
        id: "lowest_price_positioning",
        category: "pricing",
        strength: 0.8,
        evidence: [],
      },
    ]);

    expect(tensions.length).toBe(1);

    expect(
      tensions[0].type
    ).toBe("pricing_conflict");
  });

  it("returns empty when no contradiction exists", () => {
    const tensions = detectContradictions([
      {
        id: "premium_positioning",
        category: "positioning",
        strength: 0.9,
        evidence: [],
      },
    ]);

    expect(tensions.length).toBe(0);
  });
});