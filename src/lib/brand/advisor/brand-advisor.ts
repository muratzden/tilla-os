import type { OutputPack } from "@/src/lib/i18n/output-packs/output-pack-types";

export type BrandAdvice = {
  nextAction: string;
  campaignOpportunity: string;
  confidence: string;
};

export function brandAdvisor({
  selectedWorld,
  decisionStrength,
  outputPack,
}: {
  selectedWorld?: string;
  decisionStrength?: string;
  outputPack: OutputPack;
}): BrandAdvice {
  const advisor = outputPack.advisor;

  return {
    nextAction: advisor.actions.expandDominantWorld,

    campaignOpportunity: selectedWorld
      ? `${advisor.opportunities.worldStrengthened}: ${selectedWorld}`
      : advisor.opportunities.insufficientMemory,

    confidence: decisionStrength || "unknown",
  };
}