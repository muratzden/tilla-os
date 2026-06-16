import type { OutputPack } from "@/src/lib/i18n/output-packs/output-pack-types";
import { getOutputPack } from "@/src/lib/i18n/output-packs";
import type { OutputLanguage } from "../i18n/language";

type NarrativeInput = {
  outputLanguage?: OutputLanguage;
  outputPack?: OutputPack;

  dnaInterpretation?: {
    mood?: string;
    tone?: string;
    styling?: string;
    materialExpression?: string;
    colorExpression?: string;
  };
};

function getNarrativePack(input: NarrativeInput): OutputPack {
  return input.outputPack ?? getOutputPack(input.outputLanguage ?? "tr");
}

export function narrativeEngine(input: NarrativeInput) {
  const pack = getNarrativePack(input);
  const narrative = pack.narrative;

  const mood =
    input.dnaInterpretation?.mood ||
    input.dnaInterpretation?.tone ||
    "quiet_luxury";

  if (mood === "warm_heritage") {
    return {
      archetype: "craftsman",
      voice: "warm",
      values: ["honesty", "patina", "heritage", "longevity"],
      narrative: narrative.warmHeritage.narrative,
      productLanguage: narrative.warmHeritage.productLanguage,
    };
  }

  if (mood === "quiet_power") {
    return {
      archetype: "executive",
      voice: "minimal",
      values: ["authority", "restraint", "clarity", "discipline"],
      narrative: narrative.quietPower.narrative,
      productLanguage: narrative.quietPower.productLanguage,
    };
  }

  return {
    archetype: "artisan",
    voice: "refined",
    values: ["craft", "balance", "timelessness"],
    narrative: narrative.default.narrative,
    productLanguage: narrative.default.productLanguage,
  };
}
