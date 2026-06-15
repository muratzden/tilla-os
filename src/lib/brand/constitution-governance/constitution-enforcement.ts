import type { BrandConstitution } from "../constitution/constitution-types";
import type { ConstitutionGovernanceResult } from "./governance-types";

export const forbiddenDirectionSignals: Record<string, string[]> = {
  fast_fashion: [
    "fast fashion",
    "fast-fashion",
    "trend",
    "trendy",
    "seasonal",
    "cheap",
    "disposable",
  ],
  mass_production: [
    "mass production",
    "mass-produced",
    "factory",
    "industrial perfection",
    "synthetic",
    "bulk",
    "standardized",
  ],
  trend_chasing: [
    "trend",
    "trendy",
    "viral",
    "neon",
    "hype",
    "popular",
    "seasonal",
  ],
};

export function enforceBrandConstitution(params: {
  brandId: string;
  constitution: BrandConstitution;
  decisionText: string;
}): ConstitutionGovernanceResult {
  const { brandId, constitution, decisionText } = params;

  const normalizedDecisionText = decisionText.toLowerCase();

  const violations = constitution.forbiddenDirections.filter((direction) => {
    const normalizedDirection = direction.toLowerCase();

    const directMatch =
      normalizedDecisionText.includes(normalizedDirection) ||
      normalizedDecisionText.includes(
        normalizedDirection.replaceAll("_", " "),
      ) ||
      normalizedDecisionText.includes(normalizedDirection.replaceAll("_", "-"));

    const signalMatch =
      forbiddenDirectionSignals[normalizedDirection]?.some((signal) =>
        normalizedDecisionText.includes(signal),
      ) ?? false;

    return directMatch || signalMatch;
  });

  const appliedRules = constitution.decisionRules.map((rule) => rule.key);

  const governanceScore = Math.max(0, 100 - violations.length * 35);

  const allowed = violations.length === 0;

  return {
    brandId,
    status: allowed ? "allowed" : "blocked",
    allowed,
    governanceScore,
    violations,
    appliedRules,
  };
}
