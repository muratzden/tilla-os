import { compileDecisionRules } from "./decision-rule-compiler";

import { compileForbiddenDirections } from "./forbidden-direction-compiler";

import { compilePrinciples } from "./principle-compiler";

import type { GeneratedConstitution } from "./constitution-types";

export function generateConstitution(input: {
  brandId: string;

  corePrinciple: string | null;

  supportingPrinciples: string[];

  secondaryPrinciples: string[];

  forbiddenDirections: string[];
}): GeneratedConstitution {
  const allPrinciples = [
    ...(input.corePrinciple ? [input.corePrinciple] : []),

    ...input.supportingPrinciples,

    ...input.secondaryPrinciples,
  ];

  return {
    brandId: input.brandId,

    corePrinciple: input.corePrinciple,

    supportingPrinciples: input.supportingPrinciples,

    secondaryPrinciples: input.secondaryPrinciples,

    principles: compilePrinciples(allPrinciples),

    forbiddenDirections: compileForbiddenDirections(input.forbiddenDirections),

    decisionRules: compileDecisionRules(input.corePrinciple),
  };
}
