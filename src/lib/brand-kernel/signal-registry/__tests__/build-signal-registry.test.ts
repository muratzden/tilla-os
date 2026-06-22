import { describe, expect, it } from "vitest";

import { buildSignalRegistry } from "../build-signal-registry";

describe("buildSignalRegistry", () => {
  it("indexes signals by id and category", () => {
    const registry = buildSignalRegistry([
      {
        id: "s1",
        category: "identity",
        strength: 0.9,
        evidence: "identity",
      },
      {
        id: "s2",
        category: "identity",
        strength: 0.8,
        evidence: "identity 2",
      },
      {
        id: "s3",
        category: "belief",
        strength: 0.4,
        evidence: "belief",
      },
    ]);

    expect(registry.byId["s1"]).toBeDefined();

    expect(registry.byCategory["identity"]).toHaveLength(2);

    expect(registry.strongSignals).toHaveLength(2);

    expect(registry.weakSignals).toHaveLength(1);
  });
});
