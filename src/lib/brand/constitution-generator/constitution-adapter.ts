import type {
  BrandConstitution,
  ConstitutionPrincipleKey,
  ForbiddenDirectionKey,
} from "../constitution/constitution-types";

import type { GeneratedConstitution } from "./constitution-types";

const allowedPrinciples: ConstitutionPrincipleKey[] = [
  "human_craft",
  "material_truth",
  "controlled_variation",
  "character",
  "individuality",
  "longevity",
  "ownership",
];

const allowedForbiddenDirections: ForbiddenDirectionKey[] = [
  "fast_fashion",
  "mass_production",
  "fake_perfection",
  "generic_luxury",
  "trend_chasing",
];

export function adaptGeneratedConstitution(
  generated: GeneratedConstitution,
  manifestoText: string,
): BrandConstitution {
  return {
    brandId: generated.brandId,

    principles: generated.principles
      .filter((principle) =>
        allowedPrinciples.includes(principle.key as ConstitutionPrincipleKey),
      )
      .map((principle) => ({
        key: principle.key as ConstitutionPrincipleKey,
        title: principle.title,
        description: principle.description,
      })),

    forbiddenDirections: generated.forbiddenDirections
      .filter((direction) =>
        allowedForbiddenDirections.includes(direction as ForbiddenDirectionKey),
      )
      .map((direction) => direction as ForbiddenDirectionKey),

    decisionRules: generated.decisionRules,

    manifesto: {
      short: generated.corePrinciple ?? "Generated brand constitution.",

      long: manifestoText,
    },
  };
}
