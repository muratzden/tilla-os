import { WorldScoreResult } from "../world/world-scoring";
import { getDecisionReasonText } from "../../i18n/decision-reason-text";

type OutputLanguage = "tr" | "en" | "de";

export function buildRejectedAlternatives(
  candidates: any[],
  selected: any,
  outputLanguage: OutputLanguage = "tr",
) {
  return candidates
    .filter((candidate) => candidate.key !== selected.key)
    .map((candidate) => {
      const lostBecause: string[] = [];

      const winner = selected.breakdown;
      const loser = candidate.breakdown;

      if (winner.heritageFit > loser.heritageFit) {
        lostBecause.push(
          getDecisionReasonText("heritage_fit_lower_by", outputLanguage) +
            ` ${winner.heritageFit - loser.heritageFit}`,
        );
      }

      if (winner.craftSignal > loser.craftSignal) {
        lostBecause.push(
          getDecisionReasonText("craft_signal_lower_by", outputLanguage) +
            ` ${winner.craftSignal - loser.craftSignal}`,
        );
      }

      if (winner.materialWarmth > loser.materialWarmth) {
        lostBecause.push(
          getDecisionReasonText("material_warmth_lower_by", outputLanguage) +
            ` ${winner.materialWarmth - loser.materialWarmth}`,
        );
      }

      if (winner.campaignUsability > loser.campaignUsability) {
        lostBecause.push(
          getDecisionReasonText("campaign_usability_lower_by", outputLanguage) +
            ` ${winner.campaignUsability - loser.campaignUsability}`,
        );
      }

      return {
        key: candidate.key,
        score: candidate.score,
        lostBecause,
      };
    });
}
