import type { BrandInterview } from "./setup-v2-types";

export type GeneratedManifesto = {
  identity: string;
  mission: string;
  transformation: string;
  audience: string;
  principles: string[];
  vision: string;
};

export function generateManifesto(
  interview: BrandInterview,
): GeneratedManifesto {
  return {
    identity:
      interview.identity.description ||
      "Identity has not been defined yet.",

    mission: [
      interview.purpose.reasonToExist,
      interview.purpose.obsession,
    ]
      .filter(Boolean)
      .join(" "),

    transformation:
      interview.transformation.transformation ||
      "Transformation has not been defined yet.",

    audience:
      interview.audience.idealAudience ||
      "Audience has not been defined yet.",

    principles: [
      interview.principles.defend,
      interview.principles.boundaries,
    ].filter(Boolean),

    vision:
      interview.ambition.future ||
      "Vision has not been defined yet.",
  };
}