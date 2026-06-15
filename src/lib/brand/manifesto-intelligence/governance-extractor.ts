import {
  forbiddenDirectionRegistry,
  getForbiddenDirectionsForBrandType,
} from "./forbidden-direction-registry";
import type {
  GovernanceExtractionInput,
  GovernanceSignalMatch,
  GovernanceSignals,
} from "./governance-types";
import {
  getPrinciplesForBrandType,
  principleRegistry,
} from "./principle-registry";
import { scoreGovernanceSignals } from "./governance-scoring";
import {
  getForbiddenGroupSignals,
  getPrincipleGroupSignals,
} from "./signal-groups";

function normalizeText(value: string): string {
  return value.toLocaleLowerCase("tr-TR").trim();
}

function collectAnswerText(
  answers: GovernanceExtractionInput["answers"],
): string {
  return normalizeText(
    answers
      .map((answer) => answer.answer)
      .filter(Boolean)
      .join(" "),
  );
}

function getMatchedSignals(content: string, signals: string[]): string[] {
  return signals.filter((signal) => content.includes(normalizeText(signal)));
}
function getMatchedGroupSignals(
  content: string,
  key: string,
  type: "principle" | "forbidden",
): string[] {
  const signals =
    type === "principle"
      ? getPrincipleGroupSignals(key)
      : getForbiddenGroupSignals(key);

  function uniqueSignals(signals: string[]): string[] {
    return [...new Set(signals)];
  }

  return signals.filter((signal) => content.includes(normalizeText(signal)));
}

function uniqueSignals(signals: string[]): string[] {
  return [...new Set(signals)];
}

export function extractGovernanceSignals(
  input: GovernanceExtractionInput,
): GovernanceSignals {
  const content = collectAnswerText(input.answers);

  const allowedPrinciples = getPrinciplesForBrandType(input.brandType);
  const allowedForbiddenDirections = getForbiddenDirectionsForBrandType(
    input.brandType,
  );

  const principleMatches: GovernanceSignalMatch[] = allowedPrinciples
    .map((principle) => {
      const matchedSignals = uniqueSignals([
        ...getMatchedSignals(content, principle.signals),
        ...getMatchedGroupSignals(content, principle.key, "principle"),
      ]);

      return {
        key: principle.key,
        matchedSignals,
        score: matchedSignals.length,
      };
    })
    .filter((match) => match.score > 0);

  const forbiddenDirectionMatches: GovernanceSignalMatch[] =
    allowedForbiddenDirections
      .map((direction) => {
        const matchedSignals = uniqueSignals([
          ...getMatchedSignals(content, direction.signals),
          ...getMatchedGroupSignals(content, direction.key, "forbidden"),
        ]);
        return {
          key: direction.key,
          matchedSignals,
          score: matchedSignals.length,
        };
      })
      .filter((match) => match.score > 0);

  const baseSignals = {
    brandId: input.brandId,
    brandType: input.brandType,
    principles: principleMatches
      .map((match) => match.key)
      .filter((key): key is (typeof principleRegistry)[number]["key"] =>
        principleRegistry.some((principle) => principle.key === key),
      ),
    forbiddenDirections: forbiddenDirectionMatches
      .map((match) => match.key)
      .filter(
        (key): key is (typeof forbiddenDirectionRegistry)[number]["key"] =>
          forbiddenDirectionRegistry.some((direction) => direction.key === key),
      ),
    principleMatches,
    forbiddenDirectionMatches,
  };

  const scores = scoreGovernanceSignals(baseSignals);

  return {
    ...baseSignals,
    ...scores,
  };
}
