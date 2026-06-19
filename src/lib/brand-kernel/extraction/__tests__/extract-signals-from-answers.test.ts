import { describe, expect, it } from "vitest";

import { extractSignalsFromAnswers } from "../extract-signals-from-answers";

describe("extractSignalsFromAnswers", () => {
  it("extracts signals from multiple founder answers", () => {
    const result = extractSignalsFromAnswers([
      {
        id: "a1",
        question: "Belief",
        answer: "We believe products should last.",
      },
      {
        id: "a2",
        question: "Audience",
        answer: "We serve people who value craft.",
      },
    ]);

    expect(result.extractedSignals).toHaveLength(2);

    expect(
      result.extractedSignals.map((item) => item.signal.category),
    ).toContain("belief");

    expect(
      result.extractedSignals.map((item) => item.signal.category),
    ).toContain("audience");
  });
});