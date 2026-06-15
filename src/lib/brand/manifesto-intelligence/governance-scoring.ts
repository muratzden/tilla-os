import { forbiddenDirectionWeightRegistry } from "./forbidden-direction-weight-registry";
import type {
  GovernanceScoringResult,
  GovernanceSignalMatch,
} from "./governance-types";
import { principleWeightRegistry } from "./principle-weight-registry";

export type GovernanceScoringInput = {
  principleMatches: GovernanceSignalMatch[];
  forbiddenDirectionMatches: GovernanceSignalMatch[];
};

export function scoreGovernanceSignals(
  signals: GovernanceScoringInput,
): GovernanceScoringResult {
  return {
    principleScores: signals.principleMatches.map((match) => ({
      key: match.key,
      score:
        match.score *
        (principleWeightRegistry[
          match.key as keyof typeof principleWeightRegistry
        ] ?? 1),
    })),

    forbiddenDirectionScores: signals.forbiddenDirectionMatches.map(
      (match) => ({
        key: match.key,
        score:
          match.score *
          (forbiddenDirectionWeightRegistry[
            match.key as keyof typeof forbiddenDirectionWeightRegistry
          ] ?? 1),
      }),
    ),
  };
}
