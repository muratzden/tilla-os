import { describe, expect, it } from "vitest";

import { evaluateCoverage } from "../evaluate-coverage";

describe("evaluateCoverage", () => {
  it("returns full coverage when all areas exist", () => {
    const result = evaluateCoverage([
      {
        id: "1",
        category: "identity",
        strength: 0.9,
        evidence: "identity",
      },
      {
        id: "2",
        category: "audience",
        strength: 0.9,
        evidence: "audience",
      },
      {
        id: "3",
        category: "belief",
        strength: 0.9,
        evidence: "belief",
      },
      {
        id: "4",
        category: "transformation",
        strength: 0.9,
        evidence: "transformation",
      },
      {
        id: "5",
        category: "principles",
        strength: 0.9,
        evidence: "principles",
      },
    ]);

    expect(result.coverageScore).toBe(100);
    expect(result.missing).toHaveLength(0);
  });

  it("detects missing areas", () => {
    const result = evaluateCoverage([
      {
        id: "1",
        category: "identity",
        strength: 0.9,
        evidence: "identity",
      },
    ]);

    expect(result.coverageScore).toBe(20);

    expect(result.missing).toContain("audience");
    expect(result.missing).toContain("belief");
    expect(result.missing).toContain("transformation");
    expect(result.missing).toContain("principles");
  });
});
