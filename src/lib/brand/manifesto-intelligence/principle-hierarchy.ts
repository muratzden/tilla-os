import { corePrincipleRegistry } from "./core-principle-registry";

export type PrincipleHierarchyResult = {
  corePrinciple: string | null;
  supportingPrinciples: string[];
  secondaryPrinciples: string[];
};

export function determinePrincipleHierarchy(
  scoredPrinciples: {
    key: string;
    score: number;
  }[],
): PrincipleHierarchyResult {
  const presentPrinciples = scoredPrinciples.filter(
    (principle) => principle.score > 0,
  );

  const forcedCore = corePrincipleRegistry.find(
    (rule) =>
      rule.mustDominateWhenPresent &&
      presentPrinciples.some(
        (principle) => principle.key === rule.principleKey,
      ),
  );

  const corePrinciple =
    forcedCore?.principleKey ??
    [...presentPrinciples].sort((a, b) => b.score - a.score)[0]?.key ??
    null;

  const supportingPrinciples = presentPrinciples
    .filter((principle) => principle.key !== corePrinciple)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((principle) => principle.key);

  const secondaryPrinciples = presentPrinciples
    .filter(
      (principle) =>
        principle.key !== corePrinciple &&
        !supportingPrinciples.includes(principle.key),
    )
    .sort((a, b) => b.score - a.score)
    .map((principle) => principle.key);

  return {
    corePrinciple,
    supportingPrinciples,
    secondaryPrinciples,
  };
}
