import type { BrandType } from "../setup/brand-type";
import { forbiddenDirectionRegistry } from "./forbidden-direction-registry";
import type { GovernanceSignals } from "./governance-types";
import { principleRegistry } from "./principle-registry";

export type ManifestoCompositionInput = {
  brandId: string;
  brandType: BrandType;
  governanceSignals: GovernanceSignals;
};

export type ComposedManifesto = {
  brandId: string;
  brandType: BrandType;
  text: string;
  principles: string[];
  forbiddenDirections: string[];
};

function getPrincipleTitles(keys: string[]): string[] {
  return keys
    .map(
      (key) =>
        principleRegistry.find((principle) => principle.key === key)?.title,
    )
    .filter((title): title is string => Boolean(title));
}

function getForbiddenDirectionTitles(keys: string[]): string[] {
  return keys
    .map(
      (key) =>
        forbiddenDirectionRegistry.find((direction) => direction.key === key)
          ?.title,
    )
    .filter((title): title is string => Boolean(title));
}

function buildPrincipleSentence(principles: string[]): string {
  if (principles.length === 0) {
    return "This brand exists to operate with intention, clarity, and consistency.";
  }

  return `This brand is governed by ${principles.join(", ")}.`;
}

function buildForbiddenSentence(forbiddenDirections: string[]): string {
  if (forbiddenDirections.length === 0) {
    return "It avoids any direction that weakens trust, meaning, or long-term value.";
  }

  return `It rejects ${forbiddenDirections.join(", ")}.`;
}

function buildBrandTypeSentence(brandType: BrandType): string {
  const sentences: Record<BrandType, string> = {
    product:
      "Its products must carry purpose, material honesty, and lasting character.",
    service:
      "Its service must create confidence through care, reliability, and clear responsibility.",
    personal:
      "Its personal presence must remain honest, recognizable, and principle-led.",
    media:
      "Its content must protect substance, judgment, and trust over empty attention.",
    software:
      "Its software must make users more capable through clarity, reliability, and control.",
    hospitality:
      "Its experience must make people feel welcomed, respected, and cared for.",
    nonprofit:
      "Its work must create meaningful impact without exploiting the community it serves.",
  };

  return sentences[brandType];
}

export function composeManifesto(
  input: ManifestoCompositionInput,
): ComposedManifesto {
  const principles = getPrincipleTitles(input.governanceSignals.principles);

  const forbiddenDirections = getForbiddenDirectionTitles(
    input.governanceSignals.forbiddenDirections,
  );

  const text = [
    buildPrincipleSentence(principles),
    buildBrandTypeSentence(input.brandType),
    buildForbiddenSentence(forbiddenDirections),
    "Its standard is not noise, imitation, or short-term approval, but disciplined alignment between belief, behavior, and output.",
  ].join("\n\n");

  return {
    brandId: input.brandId,
    brandType: input.brandType,
    text,
    principles: input.governanceSignals.principles,
    forbiddenDirections: input.governanceSignals.forbiddenDirections,
  };
}
