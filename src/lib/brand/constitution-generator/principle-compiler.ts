import type { ConstitutionPrinciple } from "./constitution-types";

export function compilePrinciples(
  principles: string[],
): ConstitutionPrinciple[] {
  return principles.map((principle) => ({
    key: principle,

    title: principle
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),

    description: `${principle} is a governing brand principle.`,
  }));
}
