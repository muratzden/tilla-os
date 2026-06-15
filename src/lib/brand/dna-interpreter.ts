import {
  getMaterialExpression,
  getColorExpression,
} from "../i18n/expression-text";

export function interpretDNA(dna: any) {
  const outputLanguage = dna.outputLanguage ?? "tr";

  const interpretation = {
    archetypeHint: "quiet_luxury",

    emotionalTone: "calm confidence",

    tone: "controlled_confidence",

    styling: "executive_minimalism",

    materialExpression: getMaterialExpression(
      dna.material ?? "",
      outputLanguage,
    ),

    colorExpression: getColorExpression(dna.color ?? "", outputLanguage),
  };

  if (dna.color === "black" || dna.color === "siyah") {
    interpretation.archetypeHint = "quiet_power";

    interpretation.emotionalTone = "controlled confidence";

    interpretation.colorExpression = getColorExpression(
      "black",
      outputLanguage,
    );
  }

  if (dna.color === "camel" || dna.color === "taba") {
    interpretation.archetypeHint = "warm_heritage";

    interpretation.emotionalTone = "warm confidence";

    interpretation.colorExpression = getColorExpression(
      "camel",
      outputLanguage,
    );
  }

  if (dna.material === "frisco") {
    interpretation.styling = "artisan_heritage";

    interpretation.materialExpression = getMaterialExpression(
      "frisco",
      outputLanguage,
    );
  }

  if (dna.material === "crazy_horse") {
    interpretation.styling = "rugged_luxury";

    interpretation.materialExpression = getMaterialExpression(
      "crazy_horse",
      outputLanguage,
    );
  }

  return interpretation;
}
