import { composeManifesto } from "../../manifesto-intelligence/manifesto-composer";
import { determineDominantPrinciple } from "../../manifesto-intelligence/dominant-principle";
import { extractGovernanceSignals } from "../../manifesto-intelligence/governance-extractor";
import type { BrandType } from "../brand-type";
import type { ManifestoAnswer } from "./manifesto-interview-types";
import { generateConstitution } from "../../constitution-generator/constitution-generator";
import type { GeneratedConstitution } from "../../constitution-generator/constitution-types";
import { adaptGeneratedConstitution } from "../../constitution-generator/constitution-adapter";

export type GeneratedManifesto = {
  brandId: string;
  brandType: BrandType;
  text: string;

  principles: string[];
  forbiddenDirections: string[];

  principleScores: {
    key: string;
    score: number;
  }[];

  forbiddenDirectionScores: {
    key: string;
    score: number;
  }[];

  dominantPrinciple: {
    key: string | null;
    score: number;
    role: string | null;
    governancePriority: number;
    reason: string;
  };

  constitution: GeneratedConstitution;

  status: "draft";
  version: number;
};

export type GenerateManifestoInput = {
  brandId: string;
  brandType: BrandType;
  answers: ManifestoAnswer[];
};

export function generateManifestoFromInterview(
  input: GenerateManifestoInput,
): GeneratedManifesto {
  const governanceSignals = extractGovernanceSignals({
    brandId: input.brandId,
    brandType: input.brandType,
    answers: input.answers,
  });

  const composedManifesto = composeManifesto({
    brandId: input.brandId,
    brandType: input.brandType,
    governanceSignals,
  });

  const dominantPrincipleResult = determineDominantPrinciple(
    governanceSignals.principleScores,
  );

  const dominantPrinciple = {
    key: dominantPrincipleResult.dominantPrinciple,
    score:
      governanceSignals.principleScores.find(
        (principle) =>
          principle.key === dominantPrincipleResult.dominantPrinciple,
      )?.score ?? 0,
    role: dominantPrincipleResult.dominantPrinciple ? "core_principle" : null,
    governancePriority: dominantPrincipleResult.dominantPrinciple ? 100 : 0,
    reason: dominantPrincipleResult.dominantPrinciple
      ? "Selected as core principle by governance hierarchy."
      : "No dominant principle detected.",
  };

  const constitution = generateConstitution({
    brandId: input.brandId,

    corePrinciple: dominantPrincipleResult.dominantPrinciple,

    supportingPrinciples: dominantPrincipleResult.supportingPrinciples,

    secondaryPrinciples: dominantPrincipleResult.secondaryPrinciples,

    forbiddenDirections: governanceSignals.forbiddenDirectionScores
      .filter((direction) => direction.score > 0)
      .map((direction) => direction.key),
  });

  const adaptedConstitution = adaptGeneratedConstitution(
    constitution,
    composedManifesto.text,
  );

  return {
    brandId: input.brandId,
    brandType: input.brandType,

    text: composedManifesto.text,

    principles: composedManifesto.principles,

    forbiddenDirections: composedManifesto.forbiddenDirections,

    principleScores: governanceSignals.principleScores,

    forbiddenDirectionScores: governanceSignals.forbiddenDirectionScores,

    dominantPrinciple,

    constitution,

    status: "draft",

    version: 1,
  };
}
