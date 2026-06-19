import { describe, expect, it } from "vitest";

import { extractSignalsFromAnswer } from "../extract-signals-from-answer";

describe("extractSignalsFromAnswer", () => {
  it("extracts a belief signal", () => {
    const result = extractSignalsFromAnswer({
      id: "a1",
      question: "What does the brand believe?",
      answer: "We believe products should last. We reject mass production.",
    });

    expect(result).toHaveLength(1);
    expect(result[0].signal.category).toBe("belief");
    expect(result[0].evidence[0].answerId).toBe("a1");
    expect(result[0].rationale).toContain("belief");
  });

  it("extracts a principles signal", () => {
    const result = extractSignalsFromAnswer({
      id: "a2",
      question: "What should never be compromised?",
      answer: "We should never compromise material honesty.",
    });

    expect(result).toHaveLength(1);
    expect(result[0].signal.category).toBe("principles");
  });

  it("extracts multiple signals from one answer", () => {
    const result = extractSignalsFromAnswer({
      id: "a3",
      question: "Describe the brand.",
      answer:
        "At our core, we believe customers should become more confident after choosing us.",
    });

    const categories = result.map((item) => item.signal.category);

    expect(categories).toContain("identity");
    expect(categories).toContain("belief");
    expect(categories).toContain("transformation");
  });

  it("returns no signals when the answer has no detectable brand meaning", () => {
    const result = extractSignalsFromAnswer({
      id: "a4",
      question: "Random note",
      answer: "Maybe later.",
    });

    expect(result).toEqual([]);
  });
});