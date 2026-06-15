import type { ConstitutionDecisionRule } from "./constitution-types";

export function compileDecisionRules(
  corePrinciple: string | null,
): ConstitutionDecisionRule[] {
  if (!corePrinciple) {
    return [];
  }

  return [
    {
      key: "protect_core_principle",
      rule: `Always protect ${corePrinciple} in brand decisions.`,
    },
  ];
}
