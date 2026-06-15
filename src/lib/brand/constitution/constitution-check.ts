import { tillaConstitution } from "./tilla-constitution";

export type ConstitutionResult = {
  score: number;
  violations: string[];
  requiredMissing: string[];
};

export function constitutionCheck(text: string): ConstitutionResult {
  const content = text.toLowerCase();

  const violations = tillaConstitution.forbiddenClaims.filter((claim) =>
    content.includes(claim.toLowerCase()),
  );

  const requiredMissing = tillaConstitution.requiredValues.filter(
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
