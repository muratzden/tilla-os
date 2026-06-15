import { determinePrincipleHierarchy } from "./principle-hierarchy";

export type DominantPrincipleResult = {
  dominantPrinciple: string | null;
  supportingPrinciples: string[];
  secondaryPrinciples: string[];
};

export function determineDominantPrinciple(
  principleScores: {
    key: string;
    score: number;
  }[],
): DominantPrincipleResult {
  const hierarchy = determinePrincipleHierarchy(principleScores);

  return {
    dominantPrinciple: hierarchy.corePrinciple,
    supportingPrinciples: hierarchy.supportingPrinciples,
    secondaryPrinciples: hierarchy.secondaryPrinciples,
  };
}
