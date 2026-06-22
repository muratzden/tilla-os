export type ConstitutionRuleSet = {
  forbiddenClaims: string[];
  requiredValues: string[];
};

export type ConstitutionResult = {
  score: number;
  violations: string[];
  requiredMissing: string[];
};

const defaultConstitution: ConstitutionRuleSet = {
  forbiddenClaims: [],
  requiredValues: [
    "clarity",
    "consistency",
    "evidence",
    "audience fit",
    "trust",
  ],
};

export function constitutionCheck(
  text: string,
  constitution: ConstitutionRuleSet = defaultConstitution,
): ConstitutionResult {
  const content = text.toLowerCase();

  const violations = constitution.forbiddenClaims.filter((claim) =>
    content.includes(claim.toLowerCase()),
  );

  const requiredMissing = constitution.requiredValues.filter(
    (value) => !content.includes(value.toLowerCase()),
  );

  const score =
    100 - violations.length * 25 - Math.min(requiredMissing.length * 5, 50);

  return {
    score: Math.max(score, 0),
    violations,
    requiredMissing,
  };
}
